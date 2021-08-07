import 'package:favorite_button/favorite_button.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
class AddNotes extends StatefulWidget {


   const AddNotes({ Key? key }) : super(key: key);

  @override
  _AddNotesState createState() => _AddNotesState();
}

class _AddNotesState extends State<AddNotes> {

  postData() async{
    var response= await http.post(Uri.parse("https://immense-castle-94326.herokuapp.com/aliens/"),
    body:{
          "important": false.toString(),
          "performed": false.toString(),
          "work": false.toString(),
          "home": false.toString(),
          "others": false.toString(),
          "heading": "HEADING",
          "desc": "note making app",
          "id": "111",
          "date": "2018-01-01",
          "time": "12:00",
    });
    print(response.body);
  }

  int _value=0;
  final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
    onPrimary: Colors.white,
    primary: Color(0xFF0029E2),
    minimumSize: Size(88, 36),
    padding: EdgeInsets.symmetric(horizontal: 16),
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(5)),
    ),
  );

   Widget _showChoiceChip(String name, int selectNumber){
     return ChoiceChip(label: Text(name),
     selected: this._value==selectNumber,
     onSelected: (bool selected){
       this.setState((){
            _value = selected ? selectNumber : 0;
          });
     });
   }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Notes',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 28.0,
                    fontWeight: FontWeight.w500,
                  ),
        ),
        backgroundColor: Color(0xFF0029E2),
      ), 

      body: SingleChildScrollView(
        child: Container(
          color: Color(0xFFD9F0FC),
          child: Column(
            children: <Widget>[
              Container(
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: TextField(
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Enter heading'
                  ),
                ),
              ),
            ),
              
            Container(
              child: Padding(
                padding: EdgeInsets.all(32.0),
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.black)
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(20.0),
                    child: TextFormField(
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    decoration: InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: 'Your note goes here'
                    ),
                   ),
                  ),
                ),
              ),
            ),
            SizedBox(height: 5,),
              
            Center(
              child: Wrap(
                children: <Widget>[
                  
                 SizedBox(width: 20,),
                 _showChoiceChip('Work',1),
                 SizedBox(
                        width: 20,
                      ),
                 _showChoiceChip('Home',2),
                 SizedBox(
                        width: 20,
                      ),
                 _showChoiceChip('Others',3),
                 SizedBox(
                        width: 20,
                      ),
               
                FavoriteButton(
                  isFavorite: false,
                        valueChanged: (_isFavourite) {
                          print('Is Favourite $_isFavourite)');
                          if(_isFavourite==true)
                          {
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                              content: Text("Marked as Favorite"),
                              backgroundColor: Color(0xFF0029E2),
                              duration: Duration(milliseconds: 500),
                            ));
                          }
                          else
                          {
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
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
            SizedBox(height: 20,),
            SizedBox(
              height: 50,
              width: 100,
              child: ElevatedButton(
                onPressed: (){
                      // Navigator.push(
                      //   context,
                      //   MaterialPageRoute(builder: (context) => ApiCall()),
                      // );
                      postData();
                    }, 
                child: Text('SAVE',style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold),),
                style: raisedButtonStyle,),
            ),
            // SizedBox(height: 20,),
           Padding(
                    padding: EdgeInsets.only(
                        left: 50.0, right: 50.0, top: 25, bottom: 50),
                    child: Image.asset('assets/images/books.png'))
          ],
          ),
        ),
      )    
    );
  }
}

void setState(Null Function() param0) {
}



