class Note {
  String title;
  String content;
  DateTime date;

  Note({required this.title, required this.content, required this.date});
}

final Map<String, int> categories = {
  'Notes': 0,
  'Work': 0,
  'Home': 0,
  'Others': 0,
};

final List<Note> notes = [
  Note(
    title: 'Cannot Load Notes',
    content: 'Check your connection.',
    date: DateTime(2019, 10, 10, 8, 30),
  ),
 
];