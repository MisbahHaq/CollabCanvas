import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';
import 'firebase_service.dart';
import '../../models/campaign_model.dart';
import '../../models/user_model.dart';
import '../constants/app_constants.dart';

class CampaignService {
  final FirebaseService _firebaseService = FirebaseService();

  // Create a new campaign
  Future<String?> createCampaign({
    required String name,
    required String description,
    required String leaderId,
    required String leaderName,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final now = DateTime.now();
      final campaignId = _firebaseService.firestore.collection(AppConstants.campaignsCollection).doc().id;
      
      final campaign = CampaignModel(
        id: campaignId,
        name: name,
        description: description,
        leaderId: leaderId,
        leaderName: leaderName,
        startDate: startDate,
        endDate: endDate,
        createdAt: now,
        updatedAt: now,
      );

      await _firebaseService.getCampaignDoc(campaignId).set(campaign.toMap());
      
      // Update leader's campaign ID
      await _firebaseService.getUserDoc(leaderId).update({
        'campaignId': campaignId,
        'updatedAt': now.toIso8601String(),
      });

      debugPrint('[CampaignService] Campaign created: $campaignId');
      return campaignId;
    } catch (e) {
      debugPrint('[CampaignService] Error creating campaign: $e');
      return null;
    }
  }

  // Get campaign by ID
  Future<CampaignModel?> getCampaign(String campaignId) async {
    try {
      final doc = await _firebaseService.getCampaignDoc(campaignId).get();
      if (doc.exists) {
        return CampaignModel.fromSnapshot(doc);
      }
    } catch (e) {
      debugPrint('[CampaignService] Error getting campaign: $e');
    }
    return null;
  }

  // Get campaign stream for real-time updates
  Stream<CampaignModel?> getCampaignStream(String campaignId) {
    return _firebaseService.getCampaignDoc(campaignId).snapshots().map((doc) {
      if (doc.exists) {
        return CampaignModel.fromSnapshot(doc);
      }
      return null;
    });
  }

  // Update campaign
  Future<bool> updateCampaign(String campaignId, Map<String, dynamic> updates) async {
    try {
      updates['updatedAt'] = DateTime.now().toIso8601String();
      await _firebaseService.getCampaignDoc(campaignId).update(updates);
      debugPrint('[CampaignService] Campaign updated: $campaignId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error updating campaign: $e');
      return false;
    }
  }

  // Add pilgrim to campaign
  Future<bool> addPilgrimToCampaign(String campaignId, String pilgrimId) async {
    try {
      // Add pilgrim to campaign's pilgrim list
      await _firebaseService.getCampaignDoc(campaignId).update({
        'pilgrimIds': FieldValue.arrayUnion([pilgrimId]),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      // Update pilgrim's campaign ID
      await _firebaseService.getUserDoc(pilgrimId).update({
        'campaignId': campaignId,
        'updatedAt': DateTime.now().toIso8601String(),
      });

      debugPrint('[CampaignService] Pilgrim added to campaign: $pilgrimId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error adding pilgrim to campaign: $e');
      return false;
    }
  }

  // Remove pilgrim from campaign
  Future<bool> removePilgrimFromCampaign(String campaignId, String pilgrimId) async {
    try {
      // Remove pilgrim from campaign's pilgrim list
      await _firebaseService.getCampaignDoc(campaignId).update({
        'pilgrimIds': FieldValue.arrayRemove([pilgrimId]),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      // Remove campaign ID from pilgrim's profile
      await _firebaseService.getUserDoc(pilgrimId).update({
        'campaignId': FieldValue.delete(),
      'updatedAt': DateTime.now().toIso8601String(),
      });

      debugPrint('[CampaignService] Pilgrim removed from campaign: $pilgrimId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error removing pilgrim from campaign: $e');
      return false;
    }
  }

  // Get campaign pilgrims
  Future<List<UserModel>> getCampaignPilgrims(String campaignId) async {
    try {
      final campaign = await getCampaign(campaignId);
      if (campaign == null) return [];

      final pilgrims = <UserModel>[];
      for (String pilgrimId in campaign.pilgrimIds) {
        final userDoc = await _firebaseService.getUserDoc(pilgrimId).get();
        if (userDoc.exists) {
          pilgrims.add(UserModel.fromSnapshot(userDoc));
        }
      }
      return pilgrims;
    } catch (e) {
      debugPrint('[CampaignService] Error getting campaign pilgrims: $e');
      return [];
    }
  }

  // Get campaign pilgrims stream
  Stream<List<UserModel>> getCampaignPilgrimsStream(String campaignId) {
    return _firebaseService.getCampaignDoc(campaignId).snapshots().asyncMap((doc) async {
      if (!doc.exists) return <UserModel>[];
      
      final campaign = CampaignModel.fromSnapshot(doc);
      final pilgrims = <UserModel>[];
      
      for (String pilgrimId in campaign.pilgrimIds) {
        final userDoc = await _firebaseService.getUserDoc(pilgrimId).get();
        if (userDoc.exists) {
          pilgrims.add(UserModel.fromSnapshot(userDoc));
        }
      }
      return pilgrims;
    });
  }

  // Add schedule item to campaign
  Future<bool> addScheduleItem(String campaignId, ScheduleItem scheduleItem) async {
    try {
      await _firebaseService.getCampaignDoc(campaignId).update({
        'schedule': FieldValue.arrayUnion([scheduleItem.toMap()]),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      // Notify all pilgrims about schedule update
      await _firebaseService.sendNotificationToCampaign(
        campaignId: campaignId,
        title: 'Schedule Updated',
        body: 'New schedule item: ${scheduleItem.title}',
        data: {
          'type': AppConstants.notificationScheduleUpdate,
          'scheduleItemId': scheduleItem.id,
        },
      );

      debugPrint('[CampaignService] Schedule item added: ${scheduleItem.id}');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error adding schedule item: $e');
      return false;
    }
  }

  // Update schedule item
  Future<bool> updateScheduleItem(String campaignId, ScheduleItem scheduleItem) async {
    try {
      final campaign = await getCampaign(campaignId);
      if (campaign == null) return false;

      final updatedSchedule = campaign.schedule.map((item) {
        return item.id == scheduleItem.id ? scheduleItem : item;
      }).toList();

      await _firebaseService.getCampaignDoc(campaignId).update({
        'schedule': updatedSchedule.map((item) => item.toMap()).toList(),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      // Notify all pilgrims about schedule update
      await _firebaseService.sendNotificationToCampaign(
        campaignId: campaignId,
        title: 'Schedule Updated',
        body: 'Schedule item updated: ${scheduleItem.title}',
        data: {
          'type': AppConstants.notificationScheduleUpdate,
          'scheduleItemId': scheduleItem.id,
        },
      );

      debugPrint('[CampaignService] Schedule item updated: ${scheduleItem.id}');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error updating schedule item: $e');
      return false;
    }
  }

  // Delete schedule item
  Future<bool> deleteScheduleItem(String campaignId, String scheduleItemId) async {
    try {
      final campaign = await getCampaign(campaignId);
      if (campaign == null) return false;

      final updatedSchedule = campaign.schedule.where((item) => item.id != scheduleItemId).toList();

      await _firebaseService.getCampaignDoc(campaignId).update({
        'schedule': updatedSchedule.map((item) => item.toMap()).toList(),
        'updatedAt': DateTime.now().toIso8601String(),
      });

      debugPrint('[CampaignService] Schedule item deleted: $scheduleItemId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error deleting schedule item: $e');
      return false;
    }
  }

  // Get campaign locations (pilgrim locations)
  Stream<QuerySnapshot> getCampaignLocations(String campaignId) {
    return _firebaseService.getLocationsCollection(campaignId)
        .orderBy('timestamp', descending: true)
        .snapshots();
  }

  // Update pilgrim location
  Future<void> updatePilgrimLocation(String campaignId, String pilgrimId, Position position) async {
    try {
      await _firebaseService.getLocationsCollection(campaignId).add({
        'pilgrimId': pilgrimId,
        'latitude': position.latitude,
        'longitude': position.longitude,
        'accuracy': position.accuracy,
        'timestamp': FieldValue.serverTimestamp(),
      });

      // Also update user's last known location
      await _firebaseService.updateUserLocation(pilgrimId, position);
    } catch (e) {
      debugPrint('[CampaignService] Error updating pilgrim location: $e');
    }
  }

  // Get emergency requests for campaign
  Stream<QuerySnapshot> getEmergencyRequests(String campaignId) {
    return _firebaseService.getEmergencyRequestsCollection(campaignId)
        .orderBy('timestamp', descending: true)
        .snapshots();
  }

  // Resolve emergency request
  Future<bool> resolveEmergencyRequest(String campaignId, String requestId) async {
    try {
      await _firebaseService.getEmergencyRequestsCollection(campaignId)
          .doc(requestId)
          .update({
        'resolved': true,
        'resolvedAt': FieldValue.serverTimestamp(),
      });

      debugPrint('[CampaignService] Emergency request resolved: $requestId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error resolving emergency request: $e');
      return false;
    }
  }

  // Delete campaign
  Future<bool> deleteCampaign(String campaignId) async {
    try {
      // Remove campaign ID from all pilgrims
      final campaign = await getCampaign(campaignId);
      if (campaign != null) {
        for (String pilgrimId in campaign.pilgrimIds) {
          await _firebaseService.getUserDoc(pilgrimId).update({
            'campaignId': FieldValue.delete(),
      'updatedAt': DateTime.now().toIso8601String(),
    });
  }
}

      // Delete campaign document
      await _firebaseService.getCampaignDoc(campaignId).delete();

      debugPrint('[CampaignService] Campaign deleted: $campaignId');
      return true;
    } catch (e) {
      debugPrint('[CampaignService] Error deleting campaign: $e');
      return false;
    }
  }
}