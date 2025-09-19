import 'package:cloud_firestore/cloud_firestore.dart';

class CampaignModel {
  final String id;
  final String name;
  final String description;
  final String leaderId;
  final String leaderName;
  final List<String> pilgrimIds;
  final List<ScheduleItem> schedule;
  final DateTime startDate;
  final DateTime endDate;
  final String? qrCode;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  CampaignModel({
    required this.id,
    required this.name,
    required this.description,
    required this.leaderId,
    required this.leaderName,
    this.pilgrimIds = const [],
    this.schedule = const [],
    required this.startDate,
    required this.endDate,
    this.qrCode,
    this.isActive = true,
    required this.createdAt,
    required this.updatedAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'leaderId': leaderId,
      'leaderName': leaderName,
      'pilgrimIds': pilgrimIds,
      'schedule': schedule.map((item) => item.toMap()).toList(),
      'startDate': Timestamp.fromDate(startDate),
      'endDate': Timestamp.fromDate(endDate),
      'qrCode': qrCode,
      'isActive': isActive,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
    };
  }

  factory CampaignModel.fromMap(Map<String, dynamic> map) {
    return CampaignModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      description: map['description'] ?? '',
      leaderId: map['leaderId'] ?? '',
      leaderName: map['leaderName'] ?? '',
      pilgrimIds: List<String>.from(map['pilgrimIds'] ?? []),
      schedule: (map['schedule'] as List<dynamic>?)
              ?.map((item) => ScheduleItem.fromMap(item))
              .toList() ??
          [],
      startDate: map['startDate'] is Timestamp 
          ? (map['startDate'] as Timestamp).toDate()
          : DateTime.parse(map['startDate']),
      endDate: map['endDate'] is Timestamp 
          ? (map['endDate'] as Timestamp).toDate()
          : DateTime.parse(map['endDate']),
      qrCode: map['qrCode'],
      isActive: map['isActive'] ?? true,
      createdAt: map['createdAt'] is Timestamp 
          ? (map['createdAt'] as Timestamp).toDate()
          : DateTime.parse(map['createdAt']),
      updatedAt: map['updatedAt'] is Timestamp 
          ? (map['updatedAt'] as Timestamp).toDate()
          : DateTime.parse(map['updatedAt']),
    );
  }

  factory CampaignModel.fromSnapshot(DocumentSnapshot snapshot) {
    final data = snapshot.data() as Map<String, dynamic>;
    return CampaignModel.fromMap(data);
  }

  CampaignModel copyWith({
    String? id,
    String? name,
    String? description,
    String? leaderId,
    String? leaderName,
    List<String>? pilgrimIds,
    List<ScheduleItem>? schedule,
    DateTime? startDate,
    DateTime? endDate,
    String? qrCode,
    bool? isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return CampaignModel(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      leaderId: leaderId ?? this.leaderId,
      leaderName: leaderName ?? this.leaderName,
      pilgrimIds: pilgrimIds ?? this.pilgrimIds,
      schedule: schedule ?? this.schedule,
      startDate: startDate ?? this.startDate,
      endDate: endDate ?? this.endDate,
      qrCode: qrCode ?? this.qrCode,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

class ScheduleItem {
  final String id;
  final String title;
  final String description;
  final DateTime dateTime;
  final String location;
  final double? latitude;
  final double? longitude;
  final String type; // 'movement', 'gathering', 'prayer', 'meal', 'other'
  final bool isCompleted;

  ScheduleItem({
    required this.id,
    required this.title,
    required this.description,
    required this.dateTime,
    required this.location,
    this.latitude,
    this.longitude,
    this.type = 'other',
    this.isCompleted = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'dateTime': Timestamp.fromDate(dateTime),
      'location': location,
      'latitude': latitude,
      'longitude': longitude,
      'type': type,
      'isCompleted': isCompleted,
    };
  }

  factory ScheduleItem.fromMap(Map<String, dynamic> map) {
    return ScheduleItem(
      id: map['id'] ?? '',
      title: map['title'] ?? '',
      description: map['description'] ?? '',
      dateTime: map['dateTime'] is Timestamp 
          ? (map['dateTime'] as Timestamp).toDate()
          : DateTime.parse(map['dateTime']),
      location: map['location'] ?? '',
      latitude: map['latitude']?.toDouble(),
      longitude: map['longitude']?.toDouble(),
      type: map['type'] ?? 'other',
      isCompleted: map['isCompleted'] ?? false,
    );
  }

  ScheduleItem copyWith({
    String? id,
    String? title,
    String? description,
    DateTime? dateTime,
    String? location,
    double? latitude,
    double? longitude,
    String? type,
    bool? isCompleted,
  }) {
    return ScheduleItem(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      dateTime: dateTime ?? this.dateTime,
      location: location ?? this.location,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      type: type ?? this.type,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}
