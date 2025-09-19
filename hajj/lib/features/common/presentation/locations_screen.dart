import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/app_constants.dart';
import '../../../features/authentication/presentation/auth_provider.dart';

class LocationsScreen extends StatelessWidget {
  const LocationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final campaignId = auth.currentUser?.campaignId;
    return Scaffold(
      appBar: AppBar(title: const Text('Locations')),
      body: campaignId == null
          ? const Center(child: Text('Join a campaign to share/view locations'))
          : Column(
              children: [
                SwitchListTile(
                  title: const Text('Share my location'),
                  value: auth.currentUser?.isLocationEnabled ?? false,
                  onChanged: (enabled) async {
                    await auth.updateProfile(isLocationEnabled: enabled);
                    if (enabled) {
                      await _updateMyLocation(auth);
                    }
                  },
                ),
                const Divider(height: 0),
                Expanded(
                  child: StreamBuilder<QuerySnapshot>(
                    stream: FirebaseFirestore.instance
                        .collection(AppConstants.campaignsCollection)
                        .doc(campaignId)
                        .collection(AppConstants.locationsCollection)
                        .orderBy('timestamp', descending: true)
                        .limit(200)
                        .snapshots(),
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return const Center(child: CircularProgressIndicator());
                      }
                      final docs = snapshot.data!.docs;
                      if (docs.isEmpty) {
                        return const Center(
                          child: Text('No shared locations yet',
                              style: TextStyle(color: AppColors.textSecondary)),
                        );
                      }
                      return ListView.separated(
                        itemCount: docs.length,
                        separatorBuilder: (_, __) => const Divider(height: 0),
                        itemBuilder: (_, i) {
                          final m = docs[i].data() as Map<String, dynamic>;
                          return ListTile(
                            leading: const Icon(Icons.location_on, color: AppColors.primary),
                            title: Text(m['userName'] ?? 'Unknown'),
                            subtitle: Text('${m['lat']}, ${m['lng']}'),
                            trailing: Text('${m['timestamp'] ?? ''}'),
                          );
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
      floatingActionButton: (campaignId != null && (auth.currentUser?.isLocationEnabled ?? false))
          ? FloatingActionButton(
              onPressed: () => _updateMyLocation(auth),
              child: const Icon(Icons.my_location),
            )
          : null,
    );
  }

  Future<void> _updateMyLocation(AuthProvider auth) async {
    try {
      final campaignId = auth.currentUser?.campaignId;
      if (campaignId == null) return;
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) return;
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) return;
      }
      if (permission == LocationPermission.deniedForever) return;
      final pos = await Geolocator.getCurrentPosition();
      await FirebaseFirestore.instance
          .collection(AppConstants.campaignsCollection)
          .doc(campaignId)
          .collection(AppConstants.locationsCollection)
          .doc(auth.currentUser!.id)
          .set({
        'userId': auth.currentUser!.id,
        'userName': auth.currentUser!.name,
        'lat': pos.latitude,
        'lng': pos.longitude,
        'timestamp': FieldValue.serverTimestamp(),
      });
    } catch (_) {}
  }
}


