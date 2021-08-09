class NoteClass {
  final String heading;
  final String desc;
  final String id;
  final String date;
  final String time;
  final bool important;
  final bool performed;
  final bool work;
  final bool home;
  final bool others;
  final String mongoId;

  const NoteClass({
    required this.heading,
    required this.desc,
    required this.id,
    required this.date,
    required this.time,
    required this.home,
    required this.important,
    required this.performed,
    required this.others,
    required this.work,
    required this.mongoId,
  });

  factory NoteClass.fromJson(Map<String, dynamic> json) {
    return NoteClass(
      heading: json['heading'] as String,
      desc: json['desc'] as String,
      id: json['id'] as String,
      date: json['date'] as String,
      time: json['time'] as String,
      important: json['important'] as bool,
      home: json['home'] as bool,
      performed: json['perfromed'] as bool,
      others: json['others'] as bool,
      work: json['work'] as bool,
      mongoId: json['_id'] as String,
     
    );
  }
}
