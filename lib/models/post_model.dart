class Post {
  final String id;
  final String description;
  final String media;
  final int upvotes;
  final int downvotes;
  final List<String> upvotedUsers;
  final List<String> downvotedUsers;
  final String title;
  final String user;
  final List<String> comments;
  final bool isEdited;
  final int expiresAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  Post({
    required this.id,
    required this.description,
    this.media = "",
    this.upvotes = 0,
    this.downvotes = 0,
    this.upvotedUsers = const [],
    this.downvotedUsers = const [],
    required this.title,
    this.user = "Anonymous",
    this.comments = const [],
    this.isEdited = false,
    required this.expiresAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['_id'],
      description: json['description'],
      media: json['media'] ?? "",
      upvotes: json['upvotes'] ?? 0,
      downvotes: json['downvotes'] ?? 0,
      upvotedUsers: List<String>.from(json['upvotedUsers'] ?? []),
      downvotedUsers: List<String>.from(json['downvotedUsers'] ?? []),
      title: json['title'],
      user: json['user'] ?? "Anonymous",
      comments: List<String>.from(json['comments'] ?? []),
      isEdited: json['isEdited'] ?? false,
      expiresAt: json['expiresAt'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'description': description,
      'media': media,
      'upvotes': upvotes,
      'downvotes': downvotes,
      'upvotedUsers': upvotedUsers,
      'downvotedUsers': downvotedUsers,
      'title': title,
      'user': user,
      'comments': comments,
      'isEdited': isEdited,
      'expiresAt': expiresAt,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
