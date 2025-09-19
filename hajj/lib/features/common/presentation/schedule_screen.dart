import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/services/campaign_service.dart';
import '../../../models/campaign_model.dart';
import '../../../features/authentication/presentation/auth_provider.dart';

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final campaignId = auth.currentUser?.campaignId;
    return Scaffold(
      appBar: AppBar(title: const Text('Schedule')),
      body: campaignId == null
          ? const Center(child: Text('Join a campaign to view schedule'))
          : StreamBuilder<CampaignModel?>(
              stream: CampaignService().getCampaignStream(campaignId),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                final campaign = snapshot.data;
                final items = campaign?.schedule ?? [];
                if (items.isEmpty) {
                  return const Center(
                    child: Text(
                      'No schedule yet',
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                  );
                }
                return ListView.separated(
                  itemCount: items.length,
                  separatorBuilder: (_, __) => const Divider(height: 0),
                  itemBuilder: (context, i) {
                    final it = items[i];
                    return ListTile(
                      title: Text(it.title),
                      subtitle: Text('${it.location} • ${it.dateTime}'),
                      trailing: it.isCompleted
                          ? const Icon(Icons.check, color: AppColors.success)
                          : null,
                    );
                  },
                );
              },
            ),
      floatingActionButton: auth.isLeader && campaignId != null
          ? FloatingActionButton(
              onPressed: () => _addItem(context, campaignId),
              child: const Icon(Icons.add),
            )
          : null,
    );
  }

  Future<void> _addItem(BuildContext context, String campaignId) async {
    final titleCtrl = TextEditingController();
    final locCtrl = TextEditingController();
    await showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Add Schedule Item'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
                controller: titleCtrl,
                decoration: const InputDecoration(labelText: 'Title')),
            TextField(
                controller: locCtrl,
                decoration: const InputDecoration(labelText: 'Location')),
          ],
        ),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              final item = ScheduleItem(
                id: DateTime.now().millisecondsSinceEpoch.toString(),
                title: titleCtrl.text.trim(),
                description: '',
                dateTime: DateTime.now().add(const Duration(hours: 1)),
                location: locCtrl.text.trim(),
              );
              await CampaignService().addScheduleItem(campaignId, item);
              if (context.mounted) Navigator.pop(context);
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }
}
