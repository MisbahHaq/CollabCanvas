import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:typed_data';
import 'firebase_service.dart';
import '../../models/user_model.dart';
import '../constants/app_constants.dart';

class UserService {
  final FirebaseService _firebaseService = FirebaseService();

  // Get user by ID
  Future<UserModel?> getUser(String userId) async {
    try {
      final doc = await _firebaseService.getUserDoc(userId).get();
      if (doc.exists) {
        return UserModel.fromSnapshot(doc);
      }
    } catch (e) {
      debugPrint('[UserService] Error getting user: $e');
    }
    return null;
  }

  // Get user stream for real-time updates
  Stream<UserModel?> getUserStream(String userId) {
    return _firebaseService.getUserDoc(userId).snapshots().map((doc) {
      if (doc.exists) {
        return UserModel.fromSnapshot(doc);
      }
      return null;
    });
  }

  // Update user profile
  Future<bool> updateUserProfile(
      String userId, Map<String, dynamic> updates) async {
    try {
      updates['updatedAt'] = DateTime.now().toIso8601String();
      await _firebaseService.getUserDoc(userId).update(updates);
      debugPrint('[UserService] User profile updated: $userId');
      return true;
    } catch (e) {
      debugPrint('[UserService] Error updating user profile: $e');
      return false;
    }
  }

  // Upload profile image
  Future<String?> uploadProfileImage(String userId, XFile imageFile) async {
    try {
      final fileBytes = await imageFile.readAsBytes();
      final fileName =
          'profile_${userId}_${DateTime.now().millisecondsSinceEpoch}.jpg';

      final downloadUrl = await _firebaseService.uploadFile(
        path: 'profile_images',
        fileName: fileName,
        fileBytes: Uint8List.fromList(fileBytes),
        contentType: 'image/jpeg',
      );

      if (downloadUrl != null) {
        // Update user's profile image URL
        await updateUserProfile(userId, {'profileImageUrl': downloadUrl});
        debugPrint('[UserService] Profile image uploaded: $downloadUrl');
      }

      return downloadUrl;
    } catch (e) {
      debugPrint('[UserService] Error uploading profile image: $e');
      return null;
    }
  }

  // Delete profile image
  Future<bool> deleteProfileImage(String userId, String imageUrl) async {
    try {
      // Delete from Firebase Storage
      final deleted = await _firebaseService.deleteFile(imageUrl);

      if (deleted) {
        // Update user's profile image URL
        await updateUserProfile(
            userId, {'profileImageUrl': FieldValue.delete()});
        debugPrint('[UserService] Profile image deleted: $imageUrl');
      }

      return deleted;
    } catch (e) {
      debugPrint('[UserService] Error deleting profile image: $e');
      return false;
    }
  }

  // Update location settings
  Future<bool> updateLocationSettings(
      String userId, bool isLocationEnabled) async {
    try {
      await updateUserProfile(userId, {'isLocationEnabled': isLocationEnabled});

      if (isLocationEnabled) {
        // Start location tracking
        await _startLocationTracking(userId);
      } else {
        // Stop location tracking
        await _stopLocationTracking(userId);
      }

      debugPrint('[UserService] Location settings updated: $userId');
      return true;
    } catch (e) {
      debugPrint('[UserService] Error updating location settings: $e');
      return false;
    }
  }

  // Start location tracking
  Future<void> _startLocationTracking(String userId) async {
    try {
      // Get current location
      final position = await _firebaseService.getCurrentLocation();
      if (position != null) {
        await _firebaseService.updateUserLocation(userId, position);
      }

      // Set up periodic location updates
      // This would typically be done with a background service
      debugPrint('[UserService] Location tracking started for: $userId');
    } catch (e) {
      debugPrint('[UserService] Error starting location tracking: $e');
    }
  }

  // Stop location tracking
  Future<void> _stopLocationTracking(String userId) async {
    try {
      // Stop periodic location updates
      // This would typically be done with a background service
      debugPrint('[UserService] Location tracking stopped for: $userId');
    } catch (e) {
      debugPrint('[UserService] Error stopping location tracking: $e');
    }
  }

  // Get user notifications
  Stream<QuerySnapshot> getUserNotifications(String userId) {
    return _firebaseService.getUserNotifications(userId);
  }

  // Mark notification as read
  Future<void> markNotificationAsRead(String notificationId) async {
    await _firebaseService.markNotificationAsRead(notificationId);
  }

  // Get user's campaign
  Future<String?> getUserCampaign(String userId) async {
    try {
      final user = await getUser(userId);
      return user?.campaignId;
    } catch (e) {
      debugPrint('[UserService] Error getting user campaign: $e');
      return null;
    }
  }

  // Join campaign
  Future<bool> joinCampaign(String userId, String campaignId) async {
    try {
      await updateUserProfile(userId, {'campaignId': campaignId});
      debugPrint('[UserService] User joined campaign: $userId -> $campaignId');
      return true;
    } catch (e) {
      debugPrint('[UserService] Error joining campaign: $e');
      return false;
    }
  }

  // Leave campaign
  Future<bool> leaveCampaign(String userId) async {
    try {
      await updateUserProfile(userId, {'campaignId': FieldValue.delete()});
      debugPrint('[UserService] User left campaign: $userId');
      return true;
    } catch (e) {
      debugPrint('[UserService] Error leaving campaign: $e');
      return false;
    }
  }

  // Search users by name or email
  Future<List<UserModel>> searchUsers(String query) async {
    try {
      final users = <UserModel>[];

      // Search by name
      final nameQuery = await _firebaseService.firestore
          .collection(AppConstants.usersCollection)
          .where('name', isGreaterThanOrEqualTo: query)
          .where('name', isLessThan: query + 'z')
          .limit(10)
          .get();

      for (final doc in nameQuery.docs) {
        users.add(UserModel.fromSnapshot(doc));
      }

      // Search by email
      final emailQuery = await _firebaseService.firestore
          .collection(AppConstants.usersCollection)
          .where('email', isGreaterThanOrEqualTo: query)
          .where('email', isLessThan: query + 'z')
          .limit(10)
          .get();

      for (final doc in emailQuery.docs) {
        if (!users.any((user) => user.id == doc.id)) {
          users.add(UserModel.fromSnapshot(doc));
        }
      }

      return users;
    } catch (e) {
      debugPrint('[UserService] Error searching users: $e');
      return [];
    }
  }

  // Get users by role
  Future<List<UserModel>> getUsersByRole(String role) async {
    try {
      final query = await _firebaseService.firestore
          .collection(AppConstants.usersCollection)
          .where('role', isEqualTo: role)
          .get();

      return query.docs.map((doc) => UserModel.fromSnapshot(doc)).toList();
    } catch (e) {
      debugPrint('[UserService] Error getting users by role: $e');
      return [];
    }
  }

  // Update FCM token
  Future<void> updateFCMToken(String userId) async {
    await _firebaseService.updateUserFCMToken(userId);
  }

  // Send emergency request
  Future<void> sendEmergencyRequest({
    required String userId,
    required String campaignId,
    required String message,
  }) async {
    try {
      final position = await _firebaseService.getCurrentLocation();
      await _firebaseService.sendEmergencyRequest(
        userId: userId,
        campaignId: campaignId,
        message: message,
        location: position,
      );
      debugPrint('[UserService] Emergency request sent: $userId');
    } catch (e) {
      debugPrint('[UserService] Error sending emergency request: $e');
    }
  }

  // Get user's last known location
  Future<Map<String, dynamic>?> getUserLocation(String userId) async {
    try {
      final user = await getUser(userId);
      if (user != null) {
        final doc = await _firebaseService.getUserDoc(userId).get();
        if (doc.exists) {
          final data = doc.data() as Map<String, dynamic>;
          return data['lastKnownLocation'];
        }
      }
    } catch (e) {
      debugPrint('[UserService] Error getting user location: $e');
    }
    return null;
  }

  // Delete user account
  Future<bool> deleteUserAccount(String userId) async {
    try {
      // Delete user document
      await _firebaseService.getUserDoc(userId).delete();

      // Delete user from Firebase Auth (this would typically be done by the user themselves)
      // await _firebaseService.auth.currentUser?.delete();

      debugPrint('[UserService] User account deleted: $userId');
      return true;
    } catch (e) {
      debugPrint('[UserService] Error deleting user account: $e');
      return false;
    }
  }
}
