# SmartGroup - Hajj & Umrah Campaign Tracker

A comprehensive mobile application designed to serve Hajj and Umrah campaigns, facilitating communication and organization between campaign leaders and pilgrims.

## 🚀 Firebase Implementation

This project uses Firebase as the backend service provider with the following services:

### 🔥 Firebase Services Used

1. **Firebase Authentication** - User authentication for leaders and pilgrims
2. **Cloud Firestore** - Real-time database for campaigns, schedules, and user data
3. **Firebase Cloud Messaging (FCM)** - Push notifications for real-time updates
4. **Firebase Storage** - File storage for profile images and documents
5. **Firebase Analytics** - User behavior tracking (optional)

### 📱 Features Implemented

#### For Campaign Leaders:
- Create and manage Hajj/Umrah campaigns
- Add/remove pilgrims from campaigns
- Set up detailed schedules with locations
- Send real-time notifications to all pilgrims
- Track pilgrim locations on maps
- Handle emergency requests from pilgrims
- Generate QR codes for tents/buses

#### For Pilgrims:
- Join campaigns using QR codes or campaign codes
- View real-time schedules and updates
- Receive push notifications for schedule changes
- Share location with leader (optional)
- Send emergency requests with location
- Chat with leader and other pilgrims
- View group map with all pilgrim locations

### 🏗️ Architecture

```
lib/
├── core/
│   ├── constants/
│   │   ├── app_colors.dart
│   │   └── app_constants.dart
│   └── services/
│       ├── firebase_service.dart      # Main Firebase service
│       ├── campaign_service.dart      # Campaign management
│       ├── user_service.dart          # User management
│       └── notification_service.dart   # Notification handling
├── models/
│   ├── user_model.dart
│   ├── campaign_model.dart
│   └── notification_model.dart
└── features/
    ├── authentication/
    ├── campaign_management/
    ├── pilgrim_dashboard/
    └── common/
```

### 🔧 Firebase Configuration

#### Android Setup:
1. `android/app/google-services.json` - Firebase configuration
2. `android/app/build.gradle.kts` - Google Services plugin
3. `android/build.gradle.kts` - Google Services classpath

#### iOS Setup:
1. `ios/Runner/GoogleService-Info.plist` - Firebase configuration
2. iOS project configured for Firebase

#### Flutter Configuration:
1. `lib/firebase_options.dart` - Firebase options for all platforms
2. `pubspec.yaml` - Firebase dependencies

### 📊 Firestore Collections

```
users/
├── {userId}/
    ├── id: string
    ├── email: string
    ├── name: string
    ├── role: 'leader' | 'pilgrim'
    ├── phoneNumber: string?
    ├── profileImageUrl: string?
    ├── campaignId: string?
    ├── isLocationEnabled: boolean
    ├── fcmToken: string?
    ├── lastKnownLocation: object?
    ├── createdAt: timestamp
    └── updatedAt: timestamp

campaigns/
├── {campaignId}/
    ├── id: string
    ├── name: string
    ├── description: string
    ├── leaderId: string
    ├── leaderName: string
    ├── pilgrimIds: array
    ├── schedule: array
    ├── startDate: timestamp
    ├── endDate: timestamp
    ├── qrCode: string?
    ├── isActive: boolean
    ├── createdAt: timestamp
    └── updatedAt: timestamp

notifications/
├── {notificationId}/
    ├── userId: string
    ├── title: string
    ├── body: string
    ├── data: object
    ├── timestamp: timestamp
    ├── read: boolean
    └── type: string

emergency_requests/
├── {campaignId}/
    └── {requestId}/
        ├── userId: string
        ├── message: string
        ├── location: object?
        ├── timestamp: timestamp
        ├── status: string
        ├── resolved: boolean
        ├── resolvedAt: timestamp?
        └── resolvedBy: string?

locations/
├── {campaignId}/
    └── {locationId}/
        ├── pilgrimId: string
        ├── latitude: number
        ├── longitude: number
        ├── accuracy: number
        └── timestamp: timestamp
```

### 🔔 Notification Types

1. **Schedule Updates** - When schedules are modified
2. **Emergency Alerts** - Critical notifications for emergencies
3. **General Notifications** - General announcements and updates
4. **Welcome Messages** - New user onboarding
5. **Campaign Join/Leave** - Campaign membership changes
6. **Location Sharing** - Location permission changes
7. **Reminders** - Scheduled reminders for activities

### 🗺️ Location Services

- Real-time location tracking for pilgrims
- Location sharing with campaign leaders
- Emergency location sharing
- Group map with all pilgrim locations
- Location-based notifications

### 🔐 Security Rules (Recommended)

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Campaign leaders can manage their campaigns
    match /campaigns/{campaignId} {
      allow read, write: if request.auth != null && 
        resource.data.leaderId == request.auth.uid;
    }
    
    // Pilgrims can read their campaign data
    match /campaigns/{campaignId} {
      allow read: if request.auth != null && 
        request.auth.uid in resource.data.pilgrimIds;
    }
    
    // Notifications are readable by the user
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 🚀 Getting Started

1. **Clone the repository**
2. **Set up Firebase project**:
   - Create a new Firebase project
   - Enable Authentication, Firestore, Storage, and Cloud Messaging
   - Download configuration files
3. **Update configuration files**:
   - Replace dummy values in `firebase_options.dart`
   - Update `google-services.json` and `GoogleService-Info.plist`
4. **Install dependencies**: `flutter pub get`
5. **Run the app**: `flutter run`

### 📱 Platform Support

- ✅ Android
- ✅ iOS
- ❌ Web (Firebase web configuration not included)

### 🔧 Dependencies

```yaml
dependencies:
  firebase_core: ^2.24.2
  firebase_auth: ^4.15.3
  cloud_firestore: ^4.13.6
  firebase_messaging: ^14.7.10
  firebase_storage: ^11.5.6
  google_maps_flutter: ^2.5.0
  geolocator: ^10.1.0
  geocoding: ^2.1.1
  image_picker: ^1.0.4
  permission_handler: ^11.1.0
```

### 🐛 Troubleshooting

1. **Firebase initialization errors**: Check configuration files
2. **Permission denied**: Verify Firestore security rules
3. **Location not working**: Check device permissions
4. **Notifications not received**: Verify FCM setup and device permissions

### 📝 Notes

- The app uses offline-first approach with Firestore caching
- Location tracking is optional and requires user permission
- Emergency requests are handled with high priority
- All sensitive operations require authentication
- The app follows Material Design guidelines

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
