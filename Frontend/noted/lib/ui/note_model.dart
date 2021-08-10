class Note {
  String title;
  String content;
  DateTime date;

  Note({required this.title, required this.content, required this.date});
}

final Map<String, String> categories = {
  'Notes': 'All your notes',
  'Work': 'Work notes',
  'Home': 'Home notes',
  'Others': 'Miscellaneous',
};

final List<Note> notes = [
  Note(
    title: 'Cannot Load Notes',
    content: 'Check your connection.',
    date: DateTime(2019, 10, 10, 8, 30),
  ),
 
];