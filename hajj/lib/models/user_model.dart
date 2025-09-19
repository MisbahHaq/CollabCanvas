import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  final String id;
  final String email;
  final String name;
  final String role; // 'leader' or 'pilgrim'
  final String? phoneNumber;
  final String? profileImageUrl;
  final String? campaignId;
  final bool isLocationEnabled;
  final String? fcmToken;
  final Map<String, dynamic>? lastKnownLocation;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserModel({
    required this.id,
    required this.email,
    required this.name,
    required this.role,
    this.phoneNumber,
    this.profileImageUrl,
    this.campaignId,
    this.isLocationEnabled = false,
    this.fcmToken,
    this.lastKnownLocation,
    required this.createdAt,
    required this.updatedAt,
  });

  // Convert UserModel to Map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'role': role,
      'phoneNumber': phoneNumber,
      'profileImageUrl': profileImageUrl,
      'campaignId': campaignId,
      'isLocationEnabled': isLocationEnabled,
      'fcmToken': fcmToken,
      'lastKnownLocation': lastKnownLocation,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
    };
  }

  // Create UserModel from Firestore document
  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['id'] ?? '',
      email: map['email'] ?? '',
      name: map['name'] ?? '',
      role: map['role'] ?? '',
      phoneNumber: map['phoneNumber'],
      profileImageUrl: map['profileImageUrl'],
      campaignId: map['campaignId'],
      isLocationEnabled: map['isLocationEnabled'] ?? false,
      fcmToken: map['fcmToken'],
      lastKnownLocation: map['lastKnownLocation'] != null 
          ? Map<String, dynamic>.from(map['lastKnownLocation'])
          : null,
      createdAt: map['createdAt'] is Timestamp 
          ? (map['createdAt'] as Timestamp).toDate()
          : DateTime.parse(map['createdAt']),
      updatedAt: map['updatedAt'] is Timestamp 
          ? (map['updatedAt'] as Timestamp).toDate()
          : DateTime.parse(map['updatedAt']),
    );
  }

  // Create UserModel from Firestore DocumentSnapshot
  factory UserModel.fromSnapshot(DocumentSnapshot snapshot) {
    final data = snapshot.data() as Map<String, dynamic>;
    return UserModel.fromMap(data);
  }

  // Copy with method for updating user data
  UserModel copyWith({
    String? id,
    String? email,
    String? name,
    String? role,
    String? phoneNumber,
    String? profileImageUrl,
    String? campaignId,
    bool? isLocationEnabled,
    String? fcmToken,
    Map<String, dynamic>? lastKnownLocation,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      role: role ?? this.role,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
      campaignId: campaignId ?? this.campaignId,
      isLocationEnabled: isLocationEnabled ?? this.isLocationEnabled,
      fcmToken: fcmToken ?? this.fcmToken,
      lastKnownLocation: lastKnownLocation ?? this.lastKnownLocation,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  String toString() {
    return 'UserModel(id: $id, email: $email, name: $name, role: $role)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is UserModel && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;
}
