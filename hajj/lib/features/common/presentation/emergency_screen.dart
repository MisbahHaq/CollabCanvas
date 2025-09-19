import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/app_constants.dart';
import '../../../features/authentication/presentation/auth_provider.dart';

class EmergencyScreen extends StatelessWidget {
  const EmergencyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Emergency')),
      body: Center(
        child: ElevatedButton.icon(
          onPressed: () => _sendHelp(context),
          icon: const Icon(Icons.emergency),
          label: const Text(AppConstants.emergencyHelpText),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.emergency,
            foregroundColor: AppColors.textOnPrimary,
          ),
        ),
      ),
    );
  }

  Future<void> _sendHelp(BuildContext context) async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final campaignId = auth.currentUser?.campaignId;
    if (campaignId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Join a campaign first')),
      );
      return;
    }
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Enable location services')));
      return;
    }
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('Location permission denied')));
        return;
      }
    }
    if (permission == LocationPermission.deniedForever) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Location permission permanently denied')),
      );
      return;
    }

    final pos = await Geolocator.getCurrentPosition();
    await FirebaseFirestore.instance
        .collection(AppConstants.campaignsCollection)
        .doc(campaignId)
        .collection(AppConstants.emergencyRequestsCollection)
        .add({
      'userId': auth.currentUser?.id,
      'userName': auth.currentUser?.name,
      'lat': pos.latitude,
      'lng': pos.longitude,
      'timestamp': FieldValue.serverTimestamp(),
      'status': 'open',
    });
    if (context.mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Emergency sent')));
    }
  }
}


