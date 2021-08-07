import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:noted/ui/profile.dart';
import 'addNotes.dart';
import 'editNode.dart';
import 'note_model.dart';
import 'package:http/http.dart' as http;

class NotesScreen extends StatefulWidget {
  @override
  _NotesScreenState createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen>
    with SingleTickerProviderStateMixin {
  deleteData() async {
    var response = await http.delete(
      Uri.parse(
          "https://immense-castle-94326.herokuapp.com/aliens/610d8bb5e50403001569b5b4"),
    );
    print(response.body);
  }

  int _selectedCategoryIndex = 0;
  late TabController _tabController;
  final DateFormat _dateFormatter = DateFormat('dd MMM');
  final DateFormat _timeFormatter = DateFormat('h:mm');
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late FirebaseUser user;
  String name = "";

  @override
  void initState() {
    super.initState();
    getUser();
    _tabController = TabController(initialIndex: 0, length: 3, vsync: this);
  }

  getUser() async {
    user = await _auth.currentUser();
    try {
      await Firestore.instance
          .collection("users")
          .document(user.uid)
          .get()
          .then((DocumentSnapshot snapshot) {
        if (snapshot.exists) print("NAME" + snapshot.data["name"]);

        this.setState(() {
          name = snapshot.data["name"];
          name = getFirstWord(name);
        });
      });
    } catch (e) {}
  }

  static String getFirstWord(String inputString) {
    List<String> wordList = inputString.split(" ");
    if (wordList.isNotEmpty) {
      return wordList[0];
    } else {
      return ' ';
    }
  }

  Widget _buildCategoryCard(int index, String title, int count) {
    return GestureDetector(
      onTap: () {
        this.setState(() {
          _selectedCategoryIndex = index;
        });
      },
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
        height: 240.0,
        width: 175.0,
        decoration: BoxDecoration(
          color: _selectedCategoryIndex == index
              ? Color(0xFF2950FF)
              : Color(0xFFF5F7FB),
          borderRadius: BorderRadius.circular(20.0),
          boxShadow: [
            _selectedCategoryIndex == index
                ? BoxShadow(
                    color: Colors.black26,
                    offset: Offset(0, 2),
                    blurRadius: 10.0)
                : BoxShadow(color: Colors.transparent),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(20.0),
              child: Text(
                title,
                style: TextStyle(
                  color: _selectedCategoryIndex == index
                      ? Colors.white
                      : Colors.blueGrey,
                  fontSize: 28.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(20.0),
              child: Text(
                count.toString(),
                style: TextStyle(
                  color: _selectedCategoryIndex == index
                      ? Colors.white
                      : Colors.black,
                  fontSize: 35.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Color(0xFFD9F0FC),
        child: ListView(
          children: <Widget>[
            Container(
              child: SizedBox(height: 20.0),
              color: Colors.lightBlueAccent,
            ),
            Container(
              color: Colors.lightBlueAccent,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 30.0),
                child: GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ProfilePage()),
                    );
                  },
                  child: Wrap(children: [
                    Container(
                      decoration: BoxDecoration(
                          color: Color(0xFF0029E2),
                          border:
                              Border.all(color: Color(0xFF0029E2), width: 2.0),
                          borderRadius: BorderRadius.circular(20)),
                      child: Container(
                        child: Container(
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: <Widget>[
                              GestureDetector(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => ProfilePage()),
                                  );
                                },
                                child: Padding(
                                  padding: EdgeInsets.all(10.0),
                                  child: Container(
                                    height: 50.0,
                                    width: 50.0,
                                    decoration: BoxDecoration(
                                      image: DecorationImage(
                                        image: AssetImage(
                                          'assets/images/user.png',
                                        ),
                                        colorFilter: new ColorFilter.mode(
                                            Colors.white.withOpacity(1),
                                            BlendMode.dstATop),
                                      ),
                                      borderRadius: BorderRadius.circular(7.0),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Padding(
                                padding: EdgeInsets.all(0.0),
                                child: Text(
                                  '${name}',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 28.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: 10,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ]),
                ),
              ),
            ),
            Container(
              child: SizedBox(height: 20.0),
              color: Colors.lightBlueAccent,
            ),
            Container(
              color: Colors.lightBlueAccent,
              height: 200.0,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: categories.length + 1,
                itemBuilder: (BuildContext context, int index) {
                  if (index == 0) {
                    return SizedBox(width: 20.0);
                  }
                  return _buildCategoryCard(
                    index - 1,
                    categories.keys.toList()[index - 1],
                    categories.values.toList()[index - 1],
                  );
                },
              ),
            ),
            Padding(
              padding: EdgeInsets.all(15.0),
              child: Container(
                //  decoration: BoxDecoration(
                //     color: Color(0xFF0029E2),
                //     border: Border.all(color: Color(0xFF0029E2), width: 2.0),
                //     borderRadius: BorderRadius.circular(20)),
                child: TabBar(
                  controller: _tabController,
                  labelColor: Colors.white,
                  unselectedLabelColor: Color(0xFFB9CFFF),
                  indicatorColor: Color(0xFF0029E2),
                  indicatorSize: TabBarIndicatorSize.label,
                  indicatorWeight: 4.0,
                  isScrollable: true,
                  tabs: <Widget>[
                    Tab(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Color(0xFF2950FF),
                            border: Border.all(
                                color: Color(0xFF2950FF), width: 2.0),
                            borderRadius: BorderRadius.circular(10)),
                        child: Padding(
                          padding: EdgeInsets.all(5.0),
                          child: Text(
                            'Notes',
                            style: TextStyle(
                              fontSize: 22.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Tab(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Color(0xFF2950FF),
                            border: Border.all(
                                color: Color(0xFF2950FF), width: 2.0),
                            borderRadius: BorderRadius.circular(10)),
                        child: Padding(
                          padding: EdgeInsets.all(3.0),
                          child: Text(
                            'Important',
                            style: TextStyle(
                              fontSize: 22.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Tab(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Color(0xFF2950FF),
                            border: Border.all(
                                color: Color(0xFF2950FF), width: 2.0),
                            borderRadius: BorderRadius.circular(10)),
                        child: Padding(
                          padding: EdgeInsets.all(3.0),
                          child: Text(
                            'Performed',
                            style: TextStyle(
                              fontSize: 22.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 20.0),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 30.0),
              padding: EdgeInsets.all(23.0),
              decoration: BoxDecoration(
                color: Color(0xFFF5F7FB),
                borderRadius: BorderRadius.circular(30.0),
              ),
              child: Column(
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(
                        notes[0].title,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18.0,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        _timeFormatter.format(notes[0].date),
                        style: TextStyle(
                          color: Colors.blueGrey,
                          fontSize: 18.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 15.0),
                  Text(
                    notes[0].content,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18.0,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(height: 20.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: <Widget>[
                      Text(
                        _dateFormatter.format(notes[0].date),
                        style: TextStyle(
                          color: Colors.blueGrey,
                          fontSize: 18.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Row(
                        children: [
                          InkWell(
                            onTap: () {},
                            child: Container(
                              height: 30.0,
                              width: 30.0,
                              decoration: BoxDecoration(
                                color: Color(0xFF0029E2),
                                borderRadius: BorderRadius.circular(15.0),
                              ),
                              child: Icon(
                                Icons.remove_red_eye,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          InkWell(
                            onTap: () {},
                            child: Container(
                              height: 30.0,
                              width: 30.0,
                              decoration: BoxDecoration(
                                color: Color(0xFF0029E2),
                                borderRadius: BorderRadius.circular(15.0),
                              ),
                              child: Icon(
                                Icons.edit,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          InkWell(
                            onTap: () {
                              deleteData();
                            },
                            child: Container(
                              height: 30.0,
                              width: 30.0,
                              decoration: BoxDecoration(
                                color: Color(0xFF0029E2),
                                borderRadius: BorderRadius.circular(15.0),
                              ),
                              child: Icon(
                                Icons.delete,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 20.0),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
          elevation: 0.0,
          child: new Icon(Icons.add),
          backgroundColor: new Color(0xFF0029E2),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => EditNotes()),
            );
          }),
    );
  }
}
