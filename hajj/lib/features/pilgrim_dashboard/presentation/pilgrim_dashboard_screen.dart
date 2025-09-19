import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/app_colors.dart';
import '../../authentication/presentation/auth_provider.dart';

class PilgrimDashboardScreen extends StatelessWidget {
  const PilgrimDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Pilgrim Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => authProvider.signOut(),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome, ${authProvider.currentUser?.name ?? 'Pilgrim'}!',
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Your Hajj/Umrah journey companion',
              style: TextStyle(
                fontSize: 16,
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 32),

            // Dashboard Cards
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _buildDashboardCard(
                    icon: Icons.schedule,
                    title: 'Schedule',
                    description: 'View daily schedule',
                    onTap: () => context.go('/schedule'),
                  ),
                  _buildDashboardCard(
                    icon: Icons.location_on,
                    title: 'My Location',
                    description: 'Share location with leader',
                    onTap: () => context.go('/locations'),
                  ),
                  _buildDashboardCard(
                    icon: Icons.notifications,
                    title: 'Notifications',
                    description: 'View announcements',
                    onTap: () => context.go('/notifications'),
                  ),
                  _buildDashboardCard(
                    icon: Icons.emergency,
                    title: 'Emergency',
                    description: 'Request help',
                    onTap: () => context.go('/emergency'),
                  ),
                  _buildDashboardCard(
                    icon: Icons.chat,
                    title: 'Chat',
                    description: 'Message leader',
                    onTap: () => context.go('/chat'),
                  ),
                  _buildDashboardCard(
                    icon: Icons.qr_code,
                    title: 'My QR Code',
                    description: 'Show tent/bus assignment',
                    onTap: () => context.go('/qr'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDashboardCard({
    required IconData icon,
    required String title,
    required String description,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 40,
                color: AppColors.primary,
              ),
              const SizedBox(height: 8),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                description,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
