import 'package:cloud_firestore/cloud_firestore.dart';

class NotificationModel {
  final String id;
  final String userId;
  final String title;
  final String body;
  final Map<String, dynamic> data;
  final DateTime timestamp;
  final bool read;
  final String type;

  NotificationModel({
    required this.id,
    required this.userId,
    required this.title,
    required this.body,
    required this.data,
    required this.timestamp,
    this.read = false,
    required this.type,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'body': body,
      'data': data,
      'timestamp': Timestamp.fromDate(timestamp),
      'read': read,
      'type': type,
    };
  }

  factory NotificationModel.fromMap(Map<String, dynamic> map) {
    return NotificationModel(
      id: map['id'] ?? '',
      userId: map['userId'] ?? '',
      title: map['title'] ?? '',
      body: map['body'] ?? '',
      data: Map<String, dynamic>.from(map['data'] ?? {}),
      timestamp: map['timestamp'] is Timestamp 
          ? (map['timestamp'] as Timestamp).toDate()
          : DateTime.parse(map['timestamp']),
      read: map['read'] ?? false,
      type: map['type'] ?? '',
    );
  }

  factory NotificationModel.fromSnapshot(DocumentSnapshot snapshot) {
    final data = snapshot.data() as Map<String, dynamic>;
    return NotificationModel.fromMap(data);
  }

  NotificationModel copyWith({
    String? id,
    String? userId,
    String? title,
    String? body,
    Map<String, dynamic>? data,
    DateTime? timestamp,
    bool? read,
    String? type,
  }) {
    return NotificationModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      body: body ?? this.body,
      data: data ?? this.data,
      timestamp: timestamp ?? this.timestamp,
      read: read ?? this.read,
      type: type ?? this.type,
    );
  }

  @override
  String toString() {
    return 'NotificationModel(id: $id, title: $title, read: $read)';
  }
}

class EmergencyRequestModel {
  final String id;
  final String userId;
  final String campaignId;
  final String message;
  final Map<String, dynamic>? location;
  final DateTime timestamp;
  final String status; // 'pending', 'acknowledged', 'resolved'
  final bool resolved;
  final DateTime? resolvedAt;
  final String? resolvedBy;

  EmergencyRequestModel({
    required this.id,
    required this.userId,
    required this.campaignId,
    required this.message,
    this.location,
    required this.timestamp,
    this.status = 'pending',
    this.resolved = false,
    this.resolvedAt,
    this.resolvedBy,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'campaignId': campaignId,
      'message': message,
      'location': location,
      'timestamp': Timestamp.fromDate(timestamp),
      'status': status,
      'resolved': resolved,
      'resolvedAt': resolvedAt != null ? Timestamp.fromDate(resolvedAt!) : null,
      'resolvedBy': resolvedBy,
    };
  }

  factory EmergencyRequestModel.fromMap(Map<String, dynamic> map) {
    return EmergencyRequestModel(
      id: map['id'] ?? '',
      userId: map['userId'] ?? '',
      campaignId: map['campaignId'] ?? '',
      message: map['message'] ?? '',
      location: map['location'] != null 
          ? Map<String, dynamic>.from(map['location'])
          : null,
      timestamp: map['timestamp'] is Timestamp 
          ? (map['timestamp'] as Timestamp).toDate()
          : DateTime.parse(map['timestamp']),
      status: map['status'] ?? 'pending',
      resolved: map['resolved'] ?? false,
      resolvedAt: map['resolvedAt'] != null 
          ? (map['resolvedAt'] is Timestamp 
              ? (map['resolvedAt'] as Timestamp).toDate()
              : DateTime.parse(map['resolvedAt']))
          : null,
      resolvedBy: map['resolvedBy'],
    );
  }

  factory EmergencyRequestModel.fromSnapshot(DocumentSnapshot snapshot) {
    final data = snapshot.data() as Map<String, dynamic>;
    return EmergencyRequestModel.fromMap(data);
  }

  EmergencyRequestModel copyWith({
    String? id,
    String? userId,
    String? campaignId,
    String? message,
    Map<String, dynamic>? location,
    DateTime? timestamp,
    String? status,
    bool? resolved,
    DateTime? resolvedAt,
    String? resolvedBy,
  }) {
    return EmergencyRequestModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      campaignId: campaignId ?? this.campaignId,
      message: message ?? this.message,
      location: location ?? this.location,
      timestamp: timestamp ?? this.timestamp,
      status: status ?? this.status,
      resolved: resolved ?? this.resolved,
      resolvedAt: resolvedAt ?? this.resolvedAt,
      resolvedBy: resolvedBy ?? this.resolvedBy,
    );
  }

  @override
  String toString() {
    return 'EmergencyRequestModel(id: $id, userId: $userId, status: $status)';
  }
}

class LocationModel {
  final String id;
  final String pilgrimId;
  final double latitude;
  final double longitude;
  final double accuracy;
  final DateTime timestamp;

  LocationModel({
    required this.id,
    required this.pilgrimId,
    required this.latitude,
    required this.longitude,
    required this.accuracy,
    required this.timestamp,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'pilgrimId': pilgrimId,
      'latitude': latitude,
      'longitude': longitude,
      'accuracy': accuracy,
      'timestamp': Timestamp.fromDate(timestamp),
    };
  }

  factory LocationModel.fromMap(Map<String, dynamic> map) {
    return LocationModel(
      id: map['id'] ?? '',
      pilgrimId: map['pilgrimId'] ?? '',
      latitude: map['latitude']?.toDouble() ?? 0.0,
      longitude: map['longitude']?.toDouble() ?? 0.0,
      accuracy: map['accuracy']?.toDouble() ?? 0.0,
      timestamp: map['timestamp'] is Timestamp 
          ? (map['timestamp'] as Timestamp).toDate()
          : DateTime.parse(map['timestamp']),
    );
  }

  factory LocationModel.fromSnapshot(DocumentSnapshot snapshot) {
    final data = snapshot.data() as Map<String, dynamic>;
    return LocationModel.fromMap(data);
  }

  @override
  String toString() {
    return 'LocationModel(id: $id, pilgrimId: $pilgrimId, lat: $latitude, lng: $longitude)';
  }
}
