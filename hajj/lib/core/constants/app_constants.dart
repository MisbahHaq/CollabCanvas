class AppConstants {
  // App Info
  static const String appName = 'SmartGroup';
  static const String appVersion = '1.0.0';

  // Firebase Collections
  static const String usersCollection = 'users';
  static const String campaignsCollection = 'campaigns';
  static const String messagesCollection = 'messages';
  static const String locationsCollection = 'locations';
  static const String emergencyRequestsCollection = 'emergency_requests';
  static const String notificationsCollection = 'notifications';

  // User Roles
  static const String roleLeader = 'leader';
  static const String rolePilgrim = 'pilgrim';

  // Notification Types
  static const String notificationScheduleUpdate = 'schedule_update';
  static const String notificationEmergency = 'emergency';
  static const String notificationGeneral = 'general';

  // Location Settings
  static const double defaultLatitude = 21.4225; // Mecca
  static const double defaultLongitude = 39.8262; // Mecca
  static const double locationUpdateInterval = 30.0; // seconds

  // UI Constants
  static const double defaultPadding = 16.0;
  static const double defaultRadius = 8.0;
  static const double defaultElevation = 2.0;

  // Emergency
  static const String emergencyHelpText = 'I need help';
  static const int emergencyTimeoutMinutes = 5;
}
