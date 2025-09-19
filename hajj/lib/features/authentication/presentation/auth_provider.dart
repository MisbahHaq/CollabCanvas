import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../core/services/firebase_service.dart';
import '../../../models/user_model.dart';
import '../../../core/constants/app_constants.dart';

class AuthProvider extends ChangeNotifier {
  final FirebaseService _firebaseService = FirebaseService();

  UserModel? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _currentUser != null;
  bool get isLeader => _currentUser?.role == AppConstants.roleLeader;
  bool get isPilgrim => _currentUser?.role == AppConstants.rolePilgrim;

  // Initialize auth state
  Future<void> initialize() async {
    debugPrint('[AuthProvider] initialize()');
    _setLoading(true);

    // Listen to auth state changes
    _firebaseService.auth.authStateChanges().listen((User? user) async {
      debugPrint('[AuthProvider] authStateChanges user=${user?.uid}');
      if (user != null) {
        await _loadUserData(user.uid);
      } else {
        _currentUser = null;
        debugPrint('[AuthProvider] signed out (user null)');
        notifyListeners();
      }
    });

    _setLoading(false);
  }

  // Load user data from Firestore
  Future<void> _loadUserData(String userId) async {
    try {
      debugPrint('[AuthProvider] _loadUserData($userId)');
      final userDoc = await _firebaseService.getUserDoc(userId).get();
      if (userDoc.exists) {
        _currentUser = UserModel.fromSnapshot(userDoc);
        _errorMessage = null;
        debugPrint('[AuthProvider] user loaded role=${_currentUser?.role}');
      } else {
        _currentUser = null;
        _errorMessage = 'User data not found';
        debugPrint('[AuthProvider] user doc missing');
      }
    } catch (e) {
      _errorMessage = 'Failed to load user data: $e';
      _currentUser = null;
      debugPrint('[AuthProvider] _loadUserData error: $e');
    }
    notifyListeners();
  }

  // Sign up with email and password
  Future<bool> signUp({
    required String email,
    required String password,
    required String name,
    required String role,
    String? phoneNumber,
  }) async {
    _setLoading(true);
    _clearError();

    try {
      debugPrint('[AuthProvider] signUp(email=$email, role=$role)');
      // Create user account
      UserCredential userCredential = await _firebaseService.auth
          .createUserWithEmailAndPassword(email: email, password: password);

      if (userCredential.user != null) {
        // Create user document in Firestore
        final now = DateTime.now();
        final userModel = UserModel(
          id: userCredential.user!.uid,
          email: email,
          name: name,
          role: role,
          phoneNumber: phoneNumber,
          createdAt: now,
          updatedAt: now,
        );

        await _firebaseService
            .getUserDoc(userCredential.user!.uid)
            .set(userModel.toMap());

        // Update FCM token
        await _firebaseService.updateUserFCMToken(userCredential.user!.uid);

        _currentUser = userModel;
        debugPrint('[AuthProvider] signUp success uid=${userCredential.user!.uid}');
        _setLoading(false);
        return true;
      }
    } on FirebaseAuthException catch (e) {
      _setError(_getAuthErrorMessage(e.code));
      debugPrint('[AuthProvider] signUp FirebaseAuthException: ${e.code}');
    } catch (e) {
      _setError('An unexpected error occurred: $e');
      debugPrint('[AuthProvider] signUp error: $e');
    }

    _setLoading(false);
    return false;
  }

  // Sign in with email and password
  Future<bool> signIn({
    required String email,
    required String password,
  }) async {
    _setLoading(true);
    _clearError();

    try {
      debugPrint('[AuthProvider] signIn(email=$email)');
      UserCredential userCredential = await _firebaseService.auth
          .signInWithEmailAndPassword(email: email, password: password);

      if (userCredential.user != null) {
        await _loadUserData(userCredential.user!.uid);

        // Update FCM token
        await _firebaseService.updateUserFCMToken(userCredential.user!.uid);

        _setLoading(false);
        debugPrint('[AuthProvider] signIn success uid=${userCredential.user!.uid}');
        return true;
      }
    } on FirebaseAuthException catch (e) {
      _setError(_getAuthErrorMessage(e.code));
      debugPrint('[AuthProvider] signIn FirebaseAuthException: ${e.code}');
    } catch (e) {
      _setError('An unexpected error occurred: $e');
      debugPrint('[AuthProvider] signIn error: $e');
    }

    _setLoading(false);
    return false;
  }

  // Sign out
  Future<void> signOut() async {
    _setLoading(true);
    try {
      debugPrint('[AuthProvider] signOut()');
      await _firebaseService.signOut();
      _currentUser = null;
      _clearError();
    } catch (e) {
      _setError('Failed to sign out: $e');
      debugPrint('[AuthProvider] signOut error: $e');
    }
    _setLoading(false);
  }

  // Update user profile
  Future<bool> updateProfile({
    String? name,
    String? phoneNumber,
    String? profileImageUrl,
    bool? isLocationEnabled,
  }) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    _clearError();

    try {
      final updatedUser = _currentUser!.copyWith(
        name: name,
        phoneNumber: phoneNumber,
        profileImageUrl: profileImageUrl,
        isLocationEnabled: isLocationEnabled,
        updatedAt: DateTime.now(),
      );

      await _firebaseService
          .getUserDoc(_currentUser!.id)
          .update(updatedUser.toMap());

      _currentUser = updatedUser;
      _setLoading(false);
      return true;
    } catch (e) {
      _setError('Failed to update profile: $e');
      _setLoading(false);
      return false;
    }
  }

  // Join campaign
  Future<bool> joinCampaign(String campaignId) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    _clearError();

    try {
      // Update user's campaign ID
      final updatedUser = _currentUser!.copyWith(
        campaignId: campaignId,
        updatedAt: DateTime.now(),
      );

      await _firebaseService
          .getUserDoc(_currentUser!.id)
          .update(updatedUser.toMap());

      // Add user to campaign's pilgrim list
      await _firebaseService.getCampaignDoc(campaignId).update({
        'pilgrimIds': FieldValue.arrayUnion([_currentUser!.id]),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      _currentUser = updatedUser;
      _setLoading(false);
      return true;
    } catch (e) {
      _setError('Failed to join campaign: $e');
      _setLoading(false);
      return false;
    }
  }

  // Helper methods
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  String _getAuthErrorMessage(String errorCode) {
    switch (errorCode) {
      case 'user-not-found':
        return 'No user found with this email address.';
      case 'wrong-password':
        return 'Incorrect password.';
      case 'email-already-in-use':
        return 'An account already exists with this email address.';
      case 'weak-password':
        return 'Password is too weak.';
      case 'invalid-email':
        return 'Invalid email address.';
      case 'user-disabled':
        return 'This account has been disabled.';
      case 'too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
