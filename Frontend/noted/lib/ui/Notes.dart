import 'dart:convert';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:intl/intl.dart';
import 'package:noted/ui/profile.dart';
import 'package:simple_fontellico_progress_dialog/simple_fontico_loading.dart';
import 'package:simpleprogressdialog/builders/cupertino_dialog_builder.dart';
import 'package:simpleprogressdialog/builders/material_dialog_builder.dart';
import 'package:simpleprogressdialog/simpleprogressdialog.dart';
import '../Note.dart';
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
  deleteData(String id) async {
    AwesomeDialog(
                        context: context,
                        dialogType: DialogType.WARNING,
                        headerAnimationLoop: false,
                        animType: AnimType.TOPSLIDE,
                        showCloseIcon: true,
                        closeIcon: Icon(Icons.close_fullscreen_outlined),
                        title: 'Warning',
                        btnOkColor: Color(0xFF0029E2),
                        btnCancelColor: Color(0xFF353B57),
                        desc:'Are you sure you want to delete this note?',
                        btnCancelOnPress: () {},
                        onDissmissCallback: (type) {
                          debugPrint('Dialog Dissmiss from callback $type');
                        },
                        btnOkOnPress: () async{
                           try{
    //  _showDialog(context, SimpleFontelicoProgressDialogType.multiHurricane,
    //       'MultiHurricane');
    //  _showDialog(
    //       context, SimpleFontelicoProgressDialogType.bullets, 'Bullets');
  //  _showDialog(context, SimpleFontelicoProgressDialogType.cog, 'Cog');
    // _showDialog(
    //       context, SimpleFontelicoProgressDialogType.spinner, 'Spinner');
    //  _showDialog(context, SimpleFontelicoProgressDialogType.normal, 'Normal');
    // _showDialog(
    //       context, SimpleFontelicoProgressDialogType.threelines, 'Three Lines');
          //       _showDialog(
          // context, SimpleFontelicoProgressDialogType.multilines, 'Multilines');
          //       _showDialog(
          // context, SimpleFontelicoProgressDialogType.refresh, 'Refresh');
          //                 _showDialog(
          // context, SimpleFontelicoProgressDialogType.phoenix, 'Phoenix');
                          _showDialog(
          context, SimpleFontelicoProgressDialogType.hurricane, 'Hurricane');
          //  _showDialog(context, SimpleFontelicoProgressDialogType.iphone, 'Iphone');




    var response = await http.delete(
      Uri.parse("https://immense-castle-94326.herokuapp.com/aliens/" + id),
    );
    _dialog.hide();
    showSuccess('Note deleted');
    
    print(response.body);
    
    }
    catch(e)
    {
      print(e);
      _dialog.hide();
      showError(e.toString());
    }
                        })
                      ..show();
                  
   
  }

   showSuccess(String successmessage) {
    AwesomeDialog(
        context: context,
        animType: AnimType.LEFTSLIDE,
        headerAnimationLoop: false,
        dialogType: DialogType.SUCCES,
        showCloseIcon: true,
        title: 'Succes',
        desc: successmessage,
        btnOkColor: Color(0xFF0029E2),
        btnOkOnPress: () {
          debugPrint('OnClcik');
        },
        btnOkIcon: Icons.check_circle,
        onDissmissCallback: (type) {
          debugPrint('Dialog Dissmiss from callback $type');
        })
      ..show();
  }

  

  void edit(
      String heading,
      String desc,
      String id,
      String date,
      String time,
      bool important,
      bool performed,
      bool work,
      bool home,
      bool others,
      String mongoID) {
        print("EDITING");
        Navigator.push(
        context, MaterialPageRoute(builder: (context) => EditNotes(heading, desc,id,date,time,
        important,performed,work,home,others,mongoID)),                       
         );
      }


 showError(String errormessage) {
    AwesomeDialog(
        context: context,
        dialogType: DialogType.ERROR,
        animType: AnimType.RIGHSLIDE,
        headerAnimationLoop: true,
        title: 'Error',
        desc: errormessage,
        btnOkOnPress: () {},
        btnOkIcon: Icons.cancel,
        btnOkColor: Colors.red)
      ..show();
  }


   void _showDialog(BuildContext context, SimpleFontelicoProgressDialogType type,
      String text) async {
   
      _dialog = SimpleFontelicoProgressDialog(
          context: context, barrierDimisable: false);
    
    if (type == SimpleFontelicoProgressDialogType.custom) {
      _dialog.show(
          message: text,
          type: type,
          width: 150.0,
          height: 75.0,
          loadingIndicator: Text(
            'C',
            style: TextStyle(fontSize: 24.0),
          ));
    } else {
      _dialog.show(
          message: text,
          type: type,
          horizontal: true,
          width: 150.0,
          height: 75.0,
          hideText: true,
          indicatorColor: Colors.red);
    }

  }

late SimpleFontelicoProgressDialog _dialog;
    

  int _selectedCategoryIndex = 0;
  int _selectedTag = 0;
  bool isDeleting = true;
  late TabController _tabController;
  int notesCount=0;
  ProgressDialog progressDialog =ProgressDialog(barrierDismissible: false,elevation: 10);
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late final List<NoteClass> _list;
  late FirebaseUser user;
  late int notesC=0;
  bool check=true;
  String name = "";

  @override
   initState()  {
    super.initState();
    getUser();
    check=true;
    notesCount=0;
    notesC=0;
    listLoad();
    _tabController = TabController(initialIndex: 0, length: 3, vsync: this);
  }

  listLoad() async{
    _list = await fetchPhotos();
  }

  List<NoteClass> parsePhotos(String responseBody) {
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();
    return parsed.map<NoteClass>((json) => NoteClass.fromJson(json)).toList();
  }

  Future<List<NoteClass>> fetchPhotos()  async {
    final response = await http
        .get(Uri.parse('https://immense-castle-94326.herokuapp.com/aliens/'));

    print(parsePhotos(response.body));
    return parsePhotos(response.body);
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

  view(String heading,String desc)
  {
                    AwesomeDialog(
                      context: context,
                      headerAnimationLoop: false,
                      dialogType: DialogType.NO_HEADER,
                      title: heading,
                      desc:desc,
                      btnOkColor:  Color(0xFF0029E2),
                      btnOkOnPress: () {
                        debugPrint('OnClcik');
                      },
                      btnOkIcon: Icons.check_circle,
                    )..show();
                  }
                
  


  Widget _builderList(
      String heading,
      String desc,
      String id,
      String date,
      String time,
      bool important,
      bool performed,
      bool work,
      bool home,
      bool others,
      String mongoID) {
    {
      return Container(
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
                  heading,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  // _timeFormatter.format(notes[0].date),
                  time,
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
              desc,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: Colors.black,
                fontSize: 16.0,
                fontWeight: FontWeight.w300,
              ),
            ),
            SizedBox(height: 20.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: <Widget>[
                Text(
                  // _dateFormatter.format(notes[0].date),
                  date,
                  style: TextStyle(
                    color: Colors.blueGrey,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Row(
                  children: [
                    Material(
                      child: InkWell(
                        onTap: () {
                          view(heading,desc);
                          },
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
                    ),
                    SizedBox(
                      width: 15,
                    ),
                    Material(
                      child: InkWell(
                        onTap: () {
                          edit(heading, desc, id, date, time, important, performed, work, home, others, mongoID);
                        },
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
                    ),
                    SizedBox(
                      width: 15,
                    ),
                    Material(
                      child: InkWell(
                        onTap: () {
                          this.setState((){
                             deleteData(mongoID);
                          });
                         
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
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      );
    }
    //  else
    //  {

    //  }
    //  return Container();
  }

  Widget _buildCategoryCard(int index, String title, String count) {
    return GestureDetector(
      onTap: () {
        this.setState(() {
          print(index);
          _selectedCategoryIndex = index;
          print("SAHIL" + index.toString());
        });
      },

        child: Container(
          margin: EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
          height: 175.0,
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
                  count,
                  style: TextStyle(
                    color: _selectedCategoryIndex == index
                        ? Colors.white
                        : Colors.black,
                    fontSize: 20.0,
                    fontWeight: FontWeight.w400,
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
          physics: NeverScrollableScrollPhysics(),
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
                                  padding: EdgeInsets.all(9.0),
                                  child: Container(
                                    height: 50.0,
                                    width: 50.0,
                                    decoration: BoxDecoration(
                                      image: DecorationImage(
                                        image: AssetImage(
                                          'assets/images/user.png',
                                        ),
                                        // colorFilter: new ColorFilter.mode(
                                        //     Colors.white.withOpacity(1),
                                        //     BlendMode.dstATop),
                                      ),
                                      borderRadius: BorderRadius.circular(5.0),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: 5,
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
              height: 176.0,
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
            Container(
              color: Colors.lightBlueAccent,
              child: Padding(
                padding: EdgeInsets.all(0.0),
                child: Container(
                  //  decoration: BoxDecoration(
                  //     color: Color(0xFF0029E2),
                  //     border: Border.all(color: Color(0xFF0029E2), width: 2.0),
                  //     borderRadius: BorderRadius.circular(20)),
                  child: Align(
                    alignment: Alignment.center,
                    child: TabBar(
                      controller: _tabController,
                      labelColor: Colors.white,
                      unselectedLabelColor: Color(0xFFA9C3FA),
                      indicatorColor: Color(0xFF0029E2),
                      indicatorSize: TabBarIndicatorSize.label,
                      indicatorWeight: 5.0,
                      isScrollable: true,
                      tabs: <Widget>[
                        Tab(
                          child: GestureDetector(
                            onTap: () {
                              this.setState(() {
                                _selectedTag = 0;
                                _tabController.index = _selectedTag;
                              });
                            },
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
                        ),
                        Tab(
                          child: GestureDetector(
                             onTap: () {
                               this.setState(() {
                                _selectedTag = 1;
                                _tabController.index=_selectedTag;
                               });
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                  color: Color(0xFF2950FF),
                                  border: Border.all(
                                      color: Color(0xFF2950FF), width: 2.0),
                                  borderRadius: BorderRadius.circular(10)),
                              child: Padding(
                                padding: EdgeInsets.all(5.0),
                                child: Text(
                                  'Favorite',
                                  style: TextStyle(
                                    fontSize: 22.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        Tab(
                          child: GestureDetector(
                             onTap: () {
                               this.setState(() {
                                  _selectedTag = 2;
                                  _tabController.index = _selectedTag;
                               });
                            },
                            child: Container(
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                  color: Color(0xFF2950FF),
                                  border: Border.all(
                                      color: Color(0xFF2950FF), width: 2.0),
                                  borderRadius: BorderRadius.circular(10)),
                              child: Padding(
                                padding: EdgeInsets.all(5.0),
                                child: Text(
                                  'Done',
                                  style: TextStyle(
                                    fontSize: 22.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            SizedBox(height: 25.0),
            FutureBuilder<List<NoteClass>>(
              future: fetchPhotos(),
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return const Center(
                    child: Text('An error has occurred!'),
                  );
                } else if (snapshot.hasData) {
                  // return PhotosList(photos: snapshot.data!);
                  return Column(
                     
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Wrap(
                        children:[ SizedBox(
                          width: MediaQuery.of(context).size.width,
                          height: MediaQuery.of(context).size.height-400,
                         
                          child: ListView.builder(
                              scrollDirection: Axis.vertical,
                              itemCount: snapshot.data!.length,
                              
                              itemBuilder: (BuildContext context, int index) {
                                {
                                  
                                  if (snapshot.data![index].id == user.uid&&_selectedCategoryIndex==0 ) {
                                   if(_selectedTag==0){
                                     print("PERFORMED"+snapshot.data![index].performed.toString());
                                     notesCount++;
                                    return Column(
                                      children: [
                                        _builderList(
                                          snapshot.data![index].heading,
                                          snapshot.data![index].desc,
                                          snapshot.data![index].id,
                                          snapshot.data![index].date,
                                          snapshot.data![index].time,
                                          snapshot.data![index].important,
                                          snapshot.data![index].performed,
                                          snapshot.data![index].work,
                                          snapshot.data![index].home,
                                          snapshot.data![index].others,
                                          snapshot.data![index].mongoId
                                          
                                        ),
                                        SizedBox(height: 20),
                                      ],
                                    );
                                   }
                                    if(_selectedTag==1&&snapshot.data![index].important==true){
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                   }
                                     if(_selectedTag == 2&&
                                        snapshot.data![index].performed ==
                                            true){
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                   }
                                  }
                                   if (snapshot.data![index].id == user.uid &&
                                      _selectedCategoryIndex == 1&&snapshot.data![index].work ==true) {
                                   if (_selectedTag == 0) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 1 &&
                                        snapshot.data![index].important ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 2 &&
                                        snapshot.data![index].performed ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    }
                                  }
                                  if (snapshot.data![index].id == user.uid &&
                                      _selectedCategoryIndex == 2 &&
                                      snapshot.data![index].home == true) {
                                    if (_selectedTag == 0) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 1 &&
                                        snapshot.data![index].important ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 2 &&
                                        snapshot.data![index].performed ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    }
                                  }
                                   
                                  if (snapshot.data![index].id == user.uid &&
                                      _selectedCategoryIndex == 3 &&
                                      snapshot.data![index].others == true) {
                                    if (_selectedTag == 0) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 1 &&
                                        snapshot.data![index].important ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    } else if (_selectedTag == 2 &&
                                        snapshot.data![index].performed ==
                                            true) {
                                      notesCount++;
                                      return Column(
                                        children: [
                                          _builderList(
                                              snapshot.data![index].heading,
                                              snapshot.data![index].desc,
                                              snapshot.data![index].id,
                                              snapshot.data![index].date,
                                              snapshot.data![index].time,
                                              snapshot.data![index].important,
                                              snapshot.data![index].performed,
                                              snapshot.data![index].work,
                                              snapshot.data![index].home,
                                              snapshot.data![index].others,
                                              snapshot.data![index].mongoId),
                                          SizedBox(height: 20),
                                        ],
                                      );
                                    }
                                  }
                                  
                                };
                                return Container(
                                  height: 0,
                                  width: 0,
                                );
                              }),
                              
                        ),
                        ],
                        
                      ),
                      
                    //  Column(
                    //    children:[SizedBox(
                    //       width: MediaQuery.of(context).size.width,
                    //       height: 100,
                    //       child: ListView.builder(
                    //         scrollDirection: Axis.vertical,
                    //         itemCount: 1, 
                    //         itemBuilder: (BuildContext context, int index) 
                    //         {  
                    //   if (notesCount == 0) {
                    //             check=false;
                    //             return GestureDetector(
                    //               onTap: (){
                    //                 this.setState((){check=true;});
                    //                 check=true;
                    //                 Navigator.push(
                    //                   context,
                    //                   MaterialPageRoute(builder: (context) => AddNotes()),
                    //                 );
                    //                 print(check);
                    //               },
                                  
                    //               child: Container(
                    //                 margin:
                    //                     EdgeInsets.symmetric(horizontal: 30.0),
                    //                 padding: EdgeInsets.all(23.0),
                    //                 decoration: BoxDecoration(
                    //                   color: Color(0xFFF5F7FB),
                    //                   borderRadius: BorderRadius.circular(30.0),
                    //                 ),
                    //                 child: Column(
                    //                   children: <Widget>[
                    //                     Row(
                    //                       mainAxisAlignment:MainAxisAlignment.center,
                    //                       children: <Widget>[
                    //                         Text(
                    //                           "You don't have any note",
                    //                           textAlign: TextAlign.center,
                    //                           style: TextStyle(
                    //                             color: Colors.black,
                    //                             fontSize: 18.0,
                    //                             fontWeight: FontWeight.w600,
                    //                           ),
                    //                         ),
                                            
                    //                       ],
                    //                     ),
                    //                     SizedBox(height: 15.0),
                    //                     Text(
                    //                       "Add your first note",
                    //                       style: TextStyle(
                    //                         color: Colors.black,
                    //                         fontSize: 18.0,
                    //                         fontWeight: FontWeight.w500,
                    //                       ),
                    //                     ),
                                        
                    //                       ],
                    //                     ),
                                
                                      
                    //                 ),
                    //             );
                                
                    //           }
                    //           return Container(width: 0,height: 0);
                    //         },
                            
                    //   ),
                    //    ),
                    // ],
                    //  )
                    ]
                    
                  );
                  
                } else {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                }
              },
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
          elevation: 0.0,
          child: new Icon(Icons.add),
          backgroundColor: new Color(0xFF0029E2),
          onPressed: () {
            this.setState(() => {
              notesCount=0
            });
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => AddNotes())
              );
          }),
    );
  }

}
