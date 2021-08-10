import 'dart:async';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:intl/intl.dart';
import 'package:favorite_button/favorite_button.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:noted/ui/Notes.dart';
import 'package:simple_fontellico_progress_dialog/simple_fontico_loading.dart';

class EditNotes extends StatefulWidget {
 final String heading,desc,id,date,time,mongoId;
 final bool important,performed,work,home,others;
  const EditNotes(
       this.heading, 
       this.desc,
       this.id,
       this.date,
       this.time,
       this.important,
       this.performed,
       this.work,
       this.home,
       this.others,
       this.mongoId, 
  ) ;

  @override
  _EditNotesState createState() => _EditNotesState();
}

class _EditNotesState extends State<EditNotes> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late FirebaseUser user;
  late String _heading, _desc;
  late int _tag = 0;
  late Timer _timer;
  int _start = 3;
  bool imp = false;
  bool first=true;
  late SimpleFontelicoProgressDialog _dialog;
  bool selectedCheck=false;
  late TabController headingController,descController,tagController;

  @override
  initState() {
    super.initState();
    this.getUser();
    imp=widget.important;
    if (first) {
      if (widget.work == true)
        _value = 1;
      else if (widget.home == true)
        _value = 2;
      else if (widget.others == true) _value = 3;
      print("FIRST");
      first = false;
    }
    _tag=_value;
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

  getUser() async {
    user = await _auth.currentUser();
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

  void startTimer() {
    const oneSec = const Duration(seconds: 1);
    _timer = new Timer.periodic(
      oneSec,
      (Timer timer) {
        if (_start == 0) {
          setState(() {
            timer.cancel();
          });
        } else {
          setState(() {
            _start--;
          });
        }
      },
    );
  }

  postData(String id) async {
    String date = DateFormat("dd-MM-yyyy").format(DateTime.now());
    String time = DateFormat("hh:mm").format(DateTime.now());
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      if (_tag > 0) {
        bool work = false, home = false, others = false;
        if (_tag == 1)
          work = true;
        else if (_tag == 2)
          home = true;
        else if (_tag == 3) others = true;
        try {
          _showDialog(context, SimpleFontelicoProgressDialogType.hurricane,
              'Hurricane');
          var response = await http.patch(
              Uri.parse("https://immense-castle-94326.herokuapp.com/aliens/"+id),
              body: {
                "important": imp.toString(),
                "performed": selectedCheck.toString(),
                "work": work.toString(),
                "home": home.toString(),
                "others": others.toString(),
                "heading": _heading,
                "desc": _desc,
                "date": widget.date,
                "time": widget.time,
                "id"  :widget.id
               
              });
         
          
          print("EDITED");
          print(response.body);
          _dialog.hide();
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => NotesScreen()),
          );
          showSuccess( "Your note has been updated");
           
        } catch (e) {
          _dialog.hide();
          showError(e.toString());
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text("Please choose between work/home/others"),
          backgroundColor: Color(0xFF0029E2),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }
  }

  int _value = 0;
  final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
    onPrimary: Colors.white,
    primary: Color(0xFF0029E2),
    minimumSize: Size(88, 36),
    padding: EdgeInsets.symmetric(horizontal: 16),
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(5)),
    ),
  );

  Widget _showChoiceChip(String name, int selectNumber) {
    return ChoiceChip(
        label: Text(name),
        selected: this._value == selectNumber,
        onSelected: (bool selected) {
          this.setState(() {
            print("FIRST"+first.toString());
            
            {
            if(selected)
              _value = selectNumber;
              else
              {
                _value = 0;

              }
            }
              
            _tag = _value;
          });
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            'Edit your Note',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 28.0,
              fontWeight: FontWeight.w500,
            ),
          ),
          backgroundColor: Color(0xFF0029E2),
        ),
        body: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: SizedBox(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: Container(
                color: Color(0xFFD9F0FC),
                child: Column(
                  children: <Widget>[
                    Container(
                      child: Padding(
                        padding: EdgeInsets.all(16.0),
                        child: TextFormField(
                          controller: TextEditingController()..text=widget.heading,
                          onSaved: (input) => _heading = input!,
                          validator: (input) {
                            if (input!.isEmpty) return 'Enter Heading';

                            return null;
                          },
                          decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              hintText: 'Enter heading'),
                        ),
                      ),
                    ),

                    Container(
                      child: Padding(
                        padding: EdgeInsets.all(32.0),
                        child: Container(
                          decoration: BoxDecoration(
                              border: Border.all(color: Colors.black)),
                          child: Padding(
                            padding: EdgeInsets.all(20.0),
                            child: TextFormField(
                              controller: TextEditingController()
                                ..text = widget.desc,
                              onSaved: (input) => _desc = input!,
                              validator: (input) {
                                if (input!.isEmpty) return 'Enter your note';

                                return null;
                              },
                              keyboardType: TextInputType.multiline,
                              maxLines: null,
                              decoration: InputDecoration(
                                  border: UnderlineInputBorder(),
                                  labelText: 'Your note goes here'),
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),

                    Center(
                      child: Wrap(
                        children: <Widget>[
                          SizedBox(
                            width: 20,
                          ),
                          _showChoiceChip('Work', 1),
                          SizedBox(
                            width: 20,
                          ),
                          _showChoiceChip('Home', 2),
                          SizedBox(
                            width: 20,
                          ),
                          _showChoiceChip('Others', 3),
                          SizedBox(
                            width: 20,
                          ),
                          FavoriteButton(
                            isFavorite: widget.important,
                            valueChanged: (_isFavourite) {
                              this.setState(() {
                                imp = _isFavourite;
                              });
                              print('Is Favourite $_isFavourite)');
                              if (_isFavourite == true) {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(SnackBar(
                                  content: Text("Marked as Favorite"),
                                  backgroundColor: Color(0xFF0029E2),
                                  duration: Duration(milliseconds: 500),
                                ));
                              } else {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(SnackBar(
                                  content: Text("Unmarked from Favorite"),
                                  backgroundColor: Color(0xFF0029E2),
                                  duration: Duration(milliseconds: 500),
                                ));
                              }
                            },
                          ),

                        ],
                      ),
                    ),
                    Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children:[
                           Checkbox(
                             checkColor: Color(0xFF0029E2),
                             focusColor: Color(0xFF0029E2),
                          value:selectedCheck,
                          onChanged:(value)
                          {
                            this.setState(() {
                              selectedCheck = value!;
                            });
                          },
                        ),
                        Text('Done',style: TextStyle(fontSize:20 ),)
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    SizedBox(
                      height: 50,
                      width: 100,
                      child: ElevatedButton(
                        onPressed: () {
                          postData(widget.mongoId);
                        },
                        child: Text(
                          'SAVE',
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.bold),
                        ),
                        style: raisedButtonStyle,
                      ),
                    ),
                    // SizedBox(height: 20,),
                    // Padding(
                    //     padding: EdgeInsets.only(
                    //         left: 50.0, right: 50.0, top: 25, bottom: 50),
                    //     child: Image.asset('assets/images/books.png'))
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}

void setState(Null Function() param0) {}
