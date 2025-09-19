import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:typed_data';
import '../constants/app_constants.dart';
import '../../firebase_options.dart';

class FirebaseService {
  static final FirebaseService _instance = FirebaseService._internal();
  factory FirebaseService() => _instance;
  FirebaseService._internal();

  // Firebase instances
  FirebaseAuth get auth => FirebaseAuth.instance;
  FirebaseFirestore get firestore => FirebaseFirestore.instance;
  FirebaseMessaging get messaging => FirebaseMessaging.instance;
  FirebaseStorage get storage => FirebaseStorage.instance;

  // Initialize Firebase
  Future<void> initialize() async {
    debugPrint('[FirebaseService] Initializing Firebase...');
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    debugPrint('[FirebaseService] Firebase.initializeApp() done');
    
    // Configure Firestore settings
    firestore.settings = const Settings(
      persistenceEnabled: true,
      cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,
    );
    
    await _setupFirebaseMessaging();
    await _setupLocationServices();
  }

  // Setup Firebase Cloud Messaging
  Future<void> _setupFirebaseMessaging() async {
    debugPrint('[FirebaseService] Setting up FCM...');
    
    // Request permission for notifications
    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: true, // Enable for emergency notifications
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      debugPrint('[FirebaseService] FCM permission: authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.provisional) {
      debugPrint('[FirebaseService] FCM permission: provisional');
    } else {
      debugPrint('[FirebaseService] FCM permission: denied');
    }

    // Get FCM token
    String? token = await messaging.getToken();
    debugPrint('[FirebaseService] FCM Token: $token');

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      debugPrint('[FirebaseService] onMessage data=${message.data}');
      if (message.notification != null) {
        debugPrint('[FirebaseService] onMessage notification=${message.notification}');
        // Show local notification for foreground messages
        _showLocalNotification(message);
      }
    });

    // Handle background messages
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      debugPrint('[FirebaseService] onMessageOpenedApp: ${message.data}');
      _handleNotificationTap(message);
    });
  }

  // Setup location services
  Future<void> _setupLocationServices() async {
    debugPrint('[FirebaseService] Setting up location services...');
    
    // Check if location services are enabled
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      debugPrint('[FirebaseService] Location services are disabled');
      return;
    }

    // Check location permissions
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        debugPrint('[FirebaseService] Location permissions are denied');
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      debugPrint('[FirebaseService] Location permissions are permanently denied');
      return;
    }

    debugPrint('[FirebaseService] Location services setup complete');
  }

  // Show local notification for foreground messages
  void _showLocalNotification(RemoteMessage message) {
    // This would typically use flutter_local_notifications
    // For now, we'll just log it
    debugPrint('[FirebaseService] Showing local notification: ${message.notification?.title}');
  }

  // Handle notification tap
  void _handleNotificationTap(RemoteMessage message) {
    debugPrint('[FirebaseService] Handling notification tap: ${message.data}');
    // Navigate to appropriate screen based on notification data
    final type = message.data['type'];
    switch (type) {
      case 'emergency':
        // Navigate to emergency screen
        break;
      case 'schedule_update':
        // Navigate to schedule screen
        break;
      case 'general':
        // Navigate to notifications screen
        break;
    }
  }

  // Get current user
  User? get currentUser => auth.currentUser;

  // Check if user is signed in
  bool get isSignedIn => currentUser != null;

  // Get user document reference
  DocumentReference getUserDoc(String userId) {
    return firestore.collection(AppConstants.usersCollection).doc(userId);
  }

  // Get campaign document reference
  DocumentReference getCampaignDoc(String campaignId) {
    return firestore
        .collection(AppConstants.campaignsCollection)
        .doc(campaignId);
  }

  // Get messages collection reference
  CollectionReference getMessagesCollection(String campaignId) {
    return firestore
        .collection(AppConstants.campaignsCollection)
        .doc(campaignId)
        .collection(AppConstants.messagesCollection);
  }

  // Get locations collection reference
  CollectionReference getLocationsCollection(String campaignId) {
    return firestore
        .collection(AppConstants.campaignsCollection)
        .doc(campaignId)
        .collection(AppConstants.locationsCollection);
  }

  // Get emergency requests collection reference
  CollectionReference getEmergencyRequestsCollection(String campaignId) {
    return firestore
        .collection(AppConstants.campaignsCollection)
        .doc(campaignId)
        .collection(AppConstants.emergencyRequestsCollection);
  }

  // Background message handler (must be top-level function)
  static Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
    debugPrint('[FirebaseService] Background message: ${message.messageId}');
    // Handle background message here
  }

  // Send notification to specific user
  Future<void> sendNotificationToUser({
    required String userId,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    try {
      // Store notification in Firestore for offline access
      await firestore.collection(AppConstants.notificationsCollection).add({
        'userId': userId,
        'title': title,
        'body': body,
        'data': data ?? {},
        'timestamp': FieldValue.serverTimestamp(),
        'read': false,
        'type': data?['type'] ?? AppConstants.notificationGeneral,
      });

      // Get user's FCM token
      final userDoc = await getUserDoc(userId).get();
      if (userDoc.exists) {
        final userData = userDoc.data() as Map<String, dynamic>;
        final fcmToken = userData['fcmToken'];
        
        if (fcmToken != null) {
          // Send FCM notification (this would typically be done via Cloud Functions)
          await _sendFCMNotification(
            token: fcmToken,
            title: title,
            body: body,
            data: data,
          );
        }
      }
    } catch (e) {
      debugPrint('[FirebaseService] Error sending notification: $e');
    }
  }

  // Send FCM notification (placeholder for Cloud Functions integration)
  Future<void> _sendFCMNotification({
    required String token,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    // This would typically be handled by a Cloud Function
    // For now, we'll just log it
    debugPrint('[FirebaseService] Would send FCM to $token: $title - $body');
  }

  // Send notification to all campaign members
  Future<void> sendNotificationToCampaign({
    required String campaignId,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    // Get campaign document to get pilgrim IDs
    DocumentSnapshot campaignDoc = await getCampaignDoc(campaignId).get();
    if (campaignDoc.exists) {
      Map<String, dynamic> campaignData =
          campaignDoc.data() as Map<String, dynamic>;
      List<String> pilgrimIds =
          List<String>.from(campaignData['pilgrimIds'] ?? []);

      // Send notification to each pilgrim
      for (String pilgrimId in pilgrimIds) {
        await sendNotificationToUser(
          userId: pilgrimId,
          title: title,
          body: body,
          data: data,
        );
      }
    }
  }

  // Update FCM token for user
  Future<void> updateUserFCMToken(String userId) async {
    String? token = await messaging.getToken();
    if (token != null) {
      await getUserDoc(userId).update({
        'fcmToken': token,
        'updatedAt': FieldValue.serverTimestamp(),
      });
    }
  }

  // Location tracking methods
  Future<Position?> getCurrentLocation() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        debugPrint('[FirebaseService] Location services are disabled');
        return null;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          debugPrint('[FirebaseService] Location permissions are denied');
          return null;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        debugPrint('[FirebaseService] Location permissions are permanently denied');
        return null;
      }

      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
    } catch (e) {
      debugPrint('[FirebaseService] Error getting location: $e');
      return null;
    }
  }

  // Update user location in Firestore
  Future<void> updateUserLocation(String userId, Position position) async {
    try {
      await getUserDoc(userId).update({
        'lastKnownLocation': {
          'latitude': position.latitude,
          'longitude': position.longitude,
          'timestamp': FieldValue.serverTimestamp(),
          'accuracy': position.accuracy,
        },
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      debugPrint('[FirebaseService] Error updating user location: $e');
    }
  }

  // Upload file to Firebase Storage
  Future<String?> uploadFile({
    required String path,
    required String fileName,
    required Uint8List fileBytes,
    String? contentType,
  }) async {
    try {
      final ref = storage.ref().child(path).child(fileName);
      final uploadTask = ref.putData(
        fileBytes,
        SettableMetadata(contentType: contentType),
      );
      
      final snapshot = await uploadTask;
      final downloadUrl = await snapshot.ref.getDownloadURL();
      
      debugPrint('[FirebaseService] File uploaded: $downloadUrl');
      return downloadUrl;
    } catch (e) {
      debugPrint('[FirebaseService] Error uploading file: $e');
      return null;
    }
  }

  // Delete file from Firebase Storage
  Future<bool> deleteFile(String downloadUrl) async {
    try {
      final ref = storage.refFromURL(downloadUrl);
      await ref.delete();
      debugPrint('[FirebaseService] File deleted: $downloadUrl');
      return true;
    } catch (e) {
      debugPrint('[FirebaseService] Error deleting file: $e');
      return false;
    }
  }

  // Get user notifications
  Stream<QuerySnapshot> getUserNotifications(String userId) {
    return firestore
        .collection(AppConstants.notificationsCollection)
        .where('userId', isEqualTo: userId)
        .orderBy('timestamp', descending: true)
        .snapshots();
  }

  // Mark notification as read
  Future<void> markNotificationAsRead(String notificationId) async {
    try {
      await firestore
          .collection(AppConstants.notificationsCollection)
          .doc(notificationId)
          .update({'read': true});
    } catch (e) {
      debugPrint('[FirebaseService] Error marking notification as read: $e');
    }
  }

  // Send emergency request
  Future<void> sendEmergencyRequest({
    required String userId,
    required String campaignId,
    required String message,
    Position? location,
  }) async {
    try {
      await getEmergencyRequestsCollection(campaignId).add({
        'userId': userId,
        'message': message,
        'location': location != null ? {
          'latitude': location.latitude,
          'longitude': location.longitude,
          'accuracy': location.accuracy,
        } : null,
        'timestamp': FieldValue.serverTimestamp(),
        'status': 'pending',
        'resolved': false,
      });

      // Send emergency notification to leader
      final leaderId = await _getCampaignLeaderId(campaignId);
      if (leaderId != null) {
        await sendNotificationToUser(
          userId: leaderId,
          title: 'Emergency Request',
          body: message,
          data: {
            'type': AppConstants.notificationEmergency,
            'userId': userId,
            'campaignId': campaignId,
          },
        );
      }
    } catch (e) {
      debugPrint('[FirebaseService] Error sending emergency request: $e');
    }
  }

  // Get campaign leader ID
  Future<String?> _getCampaignLeaderId(String campaignId) async {
    try {
      final doc = await getCampaignDoc(campaignId).get();
      if (doc.exists) {
        final data = doc.data() as Map<String, dynamic>;
        return data['leaderId'];
      }
    } catch (e) {
      debugPrint('[FirebaseService] Error getting campaign leader: $e');
    }
    return null;
  }

  // Sign out
  Future<void> signOut() async {
    await auth.signOut();
  }
}
