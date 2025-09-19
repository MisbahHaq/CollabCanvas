import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_service.dart';
import '../constants/app_constants.dart';

class NotificationService {
  final FirebaseService _firebaseService = FirebaseService();

  // Send notification to specific user
  Future<void> sendNotificationToUser({
    required String userId,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    await _firebaseService.sendNotificationToUser(
      userId: userId,
      title: title,
      body: body,
      data: data,
    );
  }

  // Send notification to all campaign members
  Future<void> sendNotificationToCampaign({
    required String campaignId,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    await _firebaseService.sendNotificationToCampaign(
      campaignId: campaignId,
      title: title,
      body: body,
      data: data,
    );
  }

  // Send schedule update notification
  Future<void> sendScheduleUpdateNotification({
    required String campaignId,
    required String scheduleItemTitle,
    required String message,
  }) async {
    await sendNotificationToCampaign(
      campaignId: campaignId,
      title: 'Schedule Update',
      body: '$scheduleItemTitle: $message',
      data: {
        'type': AppConstants.notificationScheduleUpdate,
        'campaignId': campaignId,
      },
    );
  }

  // Send emergency notification
  Future<void> sendEmergencyNotification({
    required String userId,
    required String message,
    String? location,
  }) async {
    await sendNotificationToUser(
      userId: userId,
      title: 'Emergency Alert',
      body: message,
      data: {
        'type': AppConstants.notificationEmergency,
        'location': location,
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  // Send general notification
  Future<void> sendGeneralNotification({
    required String userId,
    required String title,
    required String body,
    Map<String, dynamic>? additionalData,
  }) async {
    final data = {
      'type': AppConstants.notificationGeneral,
      'timestamp': DateTime.now().toIso8601String(),
      ...?additionalData,
    };

    await sendNotificationToUser(
      userId: userId,
      title: title,
      body: body,
      data: data,
    );
  }

  // Get user notifications
  Stream<QuerySnapshot> getUserNotifications(String userId) {
    return _firebaseService.getUserNotifications(userId);
  }

  // Mark notification as read
  Future<void> markNotificationAsRead(String notificationId) async {
    await _firebaseService.markNotificationAsRead(notificationId);
  }

  // Mark all notifications as read for a user
  Future<void> markAllNotificationsAsRead(String userId) async {
    try {
      final notifications = await _firebaseService.firestore
          .collection(AppConstants.notificationsCollection)
          .where('userId', isEqualTo: userId)
          .where('read', isEqualTo: false)
          .get();

      final batch = _firebaseService.firestore.batch();
      for (final doc in notifications.docs) {
        batch.update(doc.reference, {'read': true});
      }
      await batch.commit();

      debugPrint('[NotificationService] All notifications marked as read: $userId');
    } catch (e) {
      debugPrint('[NotificationService] Error marking all notifications as read: $e');
    }
  }

  // Get unread notification count
  Stream<int> getUnreadNotificationCount(String userId) {
    return _firebaseService.firestore
        .collection(AppConstants.notificationsCollection)
        .where('userId', isEqualTo: userId)
        .where('read', isEqualTo: false)
        .snapshots()
        .map((snapshot) => snapshot.docs.length);
  }

  // Delete notification
  Future<void> deleteNotification(String notificationId) async {
    try {
      await _firebaseService.firestore
          .collection(AppConstants.notificationsCollection)
          .doc(notificationId)
          .delete();
      debugPrint('[NotificationService] Notification deleted: $notificationId');
    } catch (e) {
      debugPrint('[NotificationService] Error deleting notification: $e');
    }
  }

  // Delete all notifications for a user
  Future<void> deleteAllNotifications(String userId) async {
    try {
      final notifications = await _firebaseService.firestore
          .collection(AppConstants.notificationsCollection)
          .where('userId', isEqualTo: userId)
          .get();

      final batch = _firebaseService.firestore.batch();
      for (final doc in notifications.docs) {
        batch.delete(doc.reference);
      }
      await batch.commit();

      debugPrint('[NotificationService] All notifications deleted: $userId');
    } catch (e) {
      debugPrint('[NotificationService] Error deleting all notifications: $e');
    }
  }

  // Send welcome notification to new user
  Future<void> sendWelcomeNotification(String userId, String role) async {
    final title = role == AppConstants.roleLeader 
        ? 'Welcome to SmartGroup - Campaign Leader'
        : 'Welcome to SmartGroup - Pilgrim';
    
    final body = role == AppConstants.roleLeader
        ? 'You can now create and manage Hajj/Umrah campaigns for your pilgrims.'
        : 'You can now join campaigns and receive real-time updates from your leader.';

    await sendGeneralNotification(
      userId: userId,
      title: title,
      body: body,
      additionalData: {'isWelcome': true},
    );
  }

  // Send campaign join notification
  Future<void> sendCampaignJoinNotification({
    required String userId,
    required String campaignName,
  }) async {
    await sendGeneralNotification(
      userId: userId,
      title: 'Campaign Joined',
      body: 'You have successfully joined the campaign: $campaignName',
      additionalData: {'campaignName': campaignName},
    );
  }

  // Send campaign leave notification
  Future<void> sendCampaignLeaveNotification({
    required String userId,
    required String campaignName,
  }) async {
    await sendGeneralNotification(
      userId: userId,
      title: 'Campaign Left',
      body: 'You have left the campaign: $campaignName',
      additionalData: {'campaignName': campaignName},
    );
  }

  // Send location sharing notification
  Future<void> sendLocationSharingNotification({
    required String userId,
    required bool isEnabled,
  }) async {
    final title = isEnabled ? 'Location Sharing Enabled' : 'Location Sharing Disabled';
    final body = isEnabled 
        ? 'Your location will now be shared with your campaign leader for safety purposes.'
        : 'Your location sharing has been disabled.';

    await sendGeneralNotification(
      userId: userId,
      title: title,
      body: body,
      additionalData: {'locationSharing': isEnabled},
    );
  }

  // Send reminder notification
  Future<void> sendReminderNotification({
    required String userId,
    required String title,
    required String body,
    DateTime? reminderTime,
  }) async {
    await sendGeneralNotification(
      userId: userId,
      title: title,
      body: body,
      additionalData: {
        'isReminder': true,
        'reminderTime': reminderTime?.toIso8601String(),
      },
    );
  }
}
