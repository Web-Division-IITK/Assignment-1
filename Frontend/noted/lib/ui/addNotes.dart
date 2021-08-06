import 'package:favorite_button/favorite_button.dart';
import 'package:flutter/material.dart';
import 'package:noted/api/api_call.dart';
class AddNotes extends StatefulWidget {


   const AddNotes({ Key? key }) : super(key: key);

  @override
  _AddNotesState createState() => _AddNotesState();
}

class _AddNotesState extends State<AddNotes> {
  int _value=0;
  final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
    onPrimary: Colors.white,
    primary: Color(0xFF417BFB),
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
        backgroundColor: Color(0xFF417BFB),
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
            SizedBox(height: 20,),
              
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
                              backgroundColor: Color(0xFF417BFB),
                              duration: Duration(milliseconds: 500),
                            ));
                          }
                          else
                          {
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                              content: Text("Unmarked from Favorite"),
                              backgroundColor: Color(0xFF417BFB),
                              duration: Duration(milliseconds: 500),
                            ));
                          }
                        },
                ),
                ],
              ),
            ),
            SizedBox(height: 50,),
            SizedBox(
              height: 50,
              width: 100,
              child: ElevatedButton(
                onPressed: (){
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => ApiCall()),
                      );
                    }, 
                child: Text('SAVE',style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold),),
                style: raisedButtonStyle,),
            ),
            // SizedBox(height: 20,),
            Image.asset('assets/images/NOTED.png')
          ],
          ),
        ),
      )    
    );
  }
}

void setState(Null Function() param0) {
}



