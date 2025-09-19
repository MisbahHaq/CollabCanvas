# SmartGroup – Hajj & Umrah Campaign Tracker

Mobile app to organize campaigns, schedules, locations, notifications, and emergency coordination between leaders and pilgrims.

## Minimal Firebase Setup

This app uses Firebase Auth, Firestore, Messaging, and Storage. Follow these steps to configure Firebase quickly.

### 1) Create Firebase project
- Go to `https://console.firebase.google.com` and create a project.
- Enable the products you need:
  - Authentication (Email/Password)
  - Firestore Database (Start in Test Mode for development)
  - Cloud Messaging (for push notifications)
  - Storage (optional for profile images)

### 2) Configure platforms via FlutterFire CLI (recommended)
Run in project root:

```bash
dart pub global activate flutterfire_cli
flutterfire configure
```

Choose Android and iOS (and Web only if you intend to run on web). This will:
- Create apps in your Firebase project
- Generate `lib/firebase_options.dart`
- Place platform configs as needed

Update initialization (optional if you want cross‑platform web init):
- In `lib/core/services/firebase_service.dart`, replace
  `await Firebase.initializeApp();`
  with
  `await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);`
  and import `import 'package:smart_group/firebase_options.dart';`

Note: Currently we skip Firebase init on Web in `main.dart`. If you plan to run on Web, enable web during `flutterfire configure` and use the options above.

### 3) Manual placement of config files (if not using CLI)
- Android: download `google-services.json` and place at `android/app/google-services.json`.
- iOS: download `GoogleService-Info.plist` and add to Xcode under `Runner` (check “Copy items if needed”).

### 4) Android Gradle setup
- In `android/build.gradle.kts` ensure Google Services classpath is present:
  ```kotlin
  dependencies {
      classpath("com.google.gms:google-services:4.4.2")
  }
  ```
- In `android/app/build.gradle.kts` apply the plugin at the bottom:
  ```kotlin
  apply(plugin = "com.google.gms.google-services")
  ```

### 5) iOS setup
- Open `ios/Runner.xcworkspace` in Xcode after adding the plist.
- Set minimum iOS version to 13+ if needed in Xcode and `ios/Podfile`.
- Run `cd ios && pod install` if pods don’t auto‑install.

### 6) Permissions (Location/Notifications)
- Android: check `android/app/src/main/AndroidManifest.xml` for location and notifications permissions if you enable those features.
- iOS: add keys to `Info.plist` as needed, e.g. `NSLocationWhenInUseUsageDescription`, `FirebaseAppDelegateProxyEnabled` (if customizing), etc.

### 7) Testing the app
```bash
flutter clean
flutter pub get
flutter run -d android   # or -d windows / -d ios
```

Check terminal logs for lines starting with `[main]`, `[FirebaseService]`, and `[AuthProvider]` to verify initialization and auth flow.

## Notes on Web (optional)
If you intend to run on Web:
- Include Web during `flutterfire configure`.
- Initialize Firebase with `DefaultFirebaseOptions.currentPlatform`.
- Ensure `web/index.html` includes any required service worker for FCM, and that versions of FlutterFire packages are compatible with your Dart/Flutter SDK.

## Project Scripts
- Run analyzer: `flutter analyze`
- Run tests: `flutter test`

## What's Remaining (Roadmap)

- Core authentication flows
  - Email/password reset, profile edit, sign-out UX polish
  - Firestore Security Rules for users/campaigns

- Campaign management (Leader)
  - Create/update/archive campaign
  - Invite/join flows (code or QR), manage pilgrims list
  - Schedule CRUD: items, types (movement/gathering/etc.), reminders

- Pilgrim experience
  - Read-only schedule with time-to-go indicators
  - Join/leave campaign, profile toggle for location sharing

- Maps & location
  - Google Maps integration (Android/iOS API keys)
  - Foreground location sharing toggle with intervals
  - Leader group map: show all pilgrims, filter by status

- Notifications (FCM)
  - Topic/multicast sending for campaign updates
  - Foreground/local display handling, deep-links to screens
  - Optional Cloud Functions to fan-out notifications

- Chat
  - Firestore chat rooms (leader <-> pilgrims, group channel)
  - Read receipts, pagination, basic attachments (optional)

- Emergency mode
  - One-tap “I need help” with location payload
  - Leader emergency inbox, escalation and resolve state

- QR
  - Generate pilgrim QR (assignment), scan & resolve to tent/bus details

- Background tasks
  - Background location (platform constraints), battery-friendly intervals

- Polishing
  - Theming, icons/splash, empty states & error handling
  - Analytics/Crashlytics, basic metrics (optional)
  - Localization (Arabic/English), accessibility review

- CI/CD & releases
  - Keystore/Sign configs, fastlane (optional), store listings
