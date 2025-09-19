import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter/foundation.dart';
import 'core/constants/app_colors.dart';
import 'core/services/firebase_service.dart';
import 'features/authentication/presentation/auth_provider.dart';
import 'features/authentication/presentation/login_screen.dart';
import 'features/authentication/presentation/signup_screen.dart';
import 'features/campaign_management/presentation/campaign_dashboard_screen.dart';
import 'features/pilgrim_dashboard/presentation/pilgrim_dashboard_screen.dart';
import 'features/common/presentation/schedule_screen.dart';
import 'features/common/presentation/locations_screen.dart';
import 'features/common/presentation/notifications_screen.dart';
import 'features/common/presentation/emergency_screen.dart';
import 'features/common/presentation/chat_screen.dart';
import 'features/common/presentation/qr_screen.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase for mobile/desktop only (skip web)
  try {
    debugPrint('[main] kIsWeb=$kIsWeb - starting Firebase init');
    if (!kIsWeb) {
      final firebaseService = FirebaseService();
      await firebaseService.initialize();
      debugPrint('[main] Firebase initialized successfully');
    }
  } catch (e) {
    // Log but do not crash the app
    debugPrint('Firebase initialization error: $e');
  }

  runApp(const SmartGroupApp());
}


class SmartGroupApp extends StatelessWidget {
  const SmartGroupApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..initialize()),
      ],
      child: Consumer<AuthProvider>(
        builder: (context, authProvider, child) {
          return MaterialApp.router(
            title: 'SmartGroup',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
              primarySwatch: MaterialColor(
                AppColors.primary.value,
                <int, Color>{
                  50: AppColors.primary.withOpacity(0.1),
                  100: AppColors.primary.withOpacity(0.2),
                  200: AppColors.primary.withOpacity(0.3),
                  300: AppColors.primary.withOpacity(0.4),
                  400: AppColors.primary.withOpacity(0.5),
                  500: AppColors.primary,
                  600: AppColors.primary.withOpacity(0.7),
                  700: AppColors.primary.withOpacity(0.8),
                  800: AppColors.primary.withOpacity(0.9),
                  900: AppColors.primaryDark,
                },
              ),
              colorScheme: ColorScheme.fromSeed(
                seedColor: AppColors.primary,
                secondary: AppColors.secondary,
              ),
              scaffoldBackgroundColor: AppColors.background,
              appBarTheme: const AppBarTheme(
                backgroundColor: AppColors.primary,
                foregroundColor: AppColors.textOnPrimary,
                elevation: 0,
              ),
              elevatedButtonTheme: ElevatedButtonThemeData(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.textOnPrimary,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              inputDecorationTheme: InputDecorationTheme(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide:
                      const BorderSide(color: AppColors.primary, width: 2),
                ),
              ),
            ),
            routerConfig: _createRouter(authProvider),
          );
        },
      ),
    );
  }

  GoRouter _createRouter(AuthProvider authProvider) {
    return GoRouter(
      initialLocation: '/',
      redirect: (context, state) {
        final isAuthenticated = authProvider.isAuthenticated;
        final isLoading = authProvider.isLoading;
        debugPrint('[router] state=${state.uri} loading=$isLoading auth=$isAuthenticated roleL=${authProvider.isLeader}');

        // Show loading screen while checking auth state
        if (isLoading) {
          debugPrint('[router] redirect -> /loading');
          return '/loading';
        }

        // Redirect to appropriate dashboard if authenticated
        if (isAuthenticated) {
          if (state.uri.toString() == '/' ||
              state.uri.toString() == '/login' ||
              state.uri.toString() == '/signup') {
            final dest = authProvider.isLeader
                ? '/leader-dashboard'
                : '/pilgrim-dashboard';
            debugPrint('[router] redirect -> $dest');
            return dest;
          }
        } else {
          // Redirect to login if not authenticated and trying to access protected routes
          if (state.uri.toString() != '/login' &&
              state.uri.toString() != '/signup' &&
              state.uri.toString() != '/') {
            debugPrint('[router] not authed, redirect -> /login');
            return '/login';
          }
        }

        return null;
      },
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/signup',
          builder: (context, state) => const SignupScreen(),
        ),
        GoRoute(
          path: '/leader-dashboard',
          builder: (context, state) => const CampaignDashboardScreen(),
        ),
        GoRoute(
          path: '/pilgrim-dashboard',
          builder: (context, state) => const PilgrimDashboardScreen(),
        ),
        GoRoute(
          path: '/loading',
          builder: (context, state) => const LoadingScreen(),
        ),
        GoRoute(
          path: '/schedule',
          builder: (context, state) => const ScheduleScreen(),
        ),
        GoRoute(
          path: '/locations',
          builder: (context, state) => const LocationsScreen(),
        ),
        GoRoute(
          path: '/notifications',
          builder: (context, state) => const NotificationsScreen(),
        ),
        GoRoute(
          path: '/emergency',
          builder: (context, state) => const EmergencyScreen(),
        ),
        GoRoute(
          path: '/chat',
          builder: (context, state) => const ChatScreen(),
        ),
        GoRoute(
          path: '/qr',
          builder: (context, state) => const QrScreen(),
        ),
      ],
    );
  }
}

class LoadingScreen extends StatelessWidget {
  const LoadingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(
              color: AppColors.primary,
            ),
            SizedBox(height: 16),
            Text(
              'Loading...',
              style: TextStyle(
                fontSize: 16,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
