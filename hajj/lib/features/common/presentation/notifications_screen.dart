import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/app_constants.dart';
import '../../../features/authentication/presentation/auth_provider.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  final _titleCtrl = TextEditingController();
  final _bodyCtrl = TextEditingController();

  @override
  void dispose() {
    _titleCtrl.dispose();
    _bodyCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final campaignId = auth.currentUser?.campaignId;
    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: campaignId == null
          ? const Center(child: Text('Join a campaign to see notifications'))
          : Column(
              children: [
                if (auth.isLeader)
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Column(
                      children: [
                        TextField(
                          controller: _titleCtrl,
                          decoration: const InputDecoration(labelText: 'Title'),
                        ),
                        const SizedBox(height: 8),
                        TextField(
                          controller: _bodyCtrl,
                          decoration: const InputDecoration(labelText: 'Message'),
                        ),
                        const SizedBox(height: 8),
                        Align(
                          alignment: Alignment.centerRight,
                          child: ElevatedButton(
                            onPressed: () => _sendNotification(campaignId),
                            child: const Text('Send to Campaign'),
                          ),
                        )
                      ],
                    ),
                  ),
                Expanded(
                  child: StreamBuilder<QuerySnapshot>(
                    stream: FirebaseFirestore.instance
                        .collection('notifications')
                        .where('campaignId', isEqualTo: campaignId)
                        .orderBy('timestamp', descending: true)
                        .limit(100)
                        .snapshots(),
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return const Center(child: CircularProgressIndicator());
                      }
                      final docs = snapshot.data!.docs;
                      if (docs.isEmpty) {
                        return const Center(
                          child: Text('No notifications yet',
                              style: TextStyle(color: AppColors.textSecondary)),
                        );
                      }
                      return ListView.separated(
                        itemCount: docs.length,
                        separatorBuilder: (_, __) => const Divider(height: 0),
                        itemBuilder: (_, i) {
                          final m = docs[i].data() as Map<String, dynamic>;
                          return ListTile(
                            leading: const Icon(Icons.notifications),
                            title: Text(m['title'] ?? ''),
                            subtitle: Text(m['body'] ?? ''),
                          );
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }

  Future<void> _sendNotification(String campaignId) async {
    final title = _titleCtrl.text.trim();
    final body = _bodyCtrl.text.trim();
    if (title.isEmpty || body.isEmpty) return;
    _titleCtrl.clear();
    _bodyCtrl.clear();
    await FirebaseFirestore.instance.collection('notifications').add({
      'campaignId': campaignId,
      'title': title,
      'body': body,
      'type': AppConstants.notificationGeneral,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}


