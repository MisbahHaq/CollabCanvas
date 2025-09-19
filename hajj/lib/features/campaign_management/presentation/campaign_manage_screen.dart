import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../models/campaign_model.dart';
import '../../../features/authentication/presentation/auth_provider.dart';
import '../../../core/services/campaign_service.dart';

class CampaignManageScreen extends StatefulWidget {
  const CampaignManageScreen({super.key});

  @override
  State<CampaignManageScreen> createState() => _CampaignManageScreenState();
}

class _CampaignManageScreenState extends State<CampaignManageScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _descCtrl = TextEditingController();

  @override
  void dispose() {
    _nameCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    return Scaffold(
      appBar: AppBar(title: const Text('Create Campaign')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameCtrl,
                decoration: const InputDecoration(labelText: 'Campaign Name'),
                validator: (v) =>
                    (v == null || v.trim().isEmpty) ? 'Required' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _descCtrl,
                decoration: const InputDecoration(labelText: 'Description'),
                maxLines: 3,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => _createCampaign(context, auth),
                child: const Text('Create'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _createCampaign(BuildContext context, AuthProvider auth) async {
    if (!_formKey.currentState!.validate()) return;
    final now = DateTime.now();
    final leaderId = auth.currentUser?.id ?? 'unknown';
    final leaderName = auth.currentUser?.name ?? 'Leader';

    await CampaignService().createCampaign(
      name: _nameCtrl.text.trim(),
      description: _descCtrl.text.trim(),
      leaderId: leaderId,
      leaderName: leaderName,
      startDate: now,
      endDate: now.add(const Duration(days: 7)),
    );

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Campaign created')),
    );
    Navigator.of(context).pop();
  }
}
