import 'package:flutter/material.dart';
class ProfilePage extends StatelessWidget {
  const ProfilePage({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF417BFB),
        title: Text('My Profile',
          style: TextStyle(fontSize: 25.0, fontWeight: FontWeight.bold))
      ),
      body: Container(
        color: Color(0xFFD9F0FC),
        child: Column(
          children:<Widget>[
            Card(
              color: Color(0xFFF5F7FB),
             child: new Column(
              children: <Widget>[
                new Image.network(
                    'https://i.ytimg.com/vi/fq4N0hgOWzU/maxresdefault.jpg'),
                new Padding(
                    padding: new EdgeInsets.all(20.0),
                    child: new Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        new Padding(
                          padding: new EdgeInsets.all(7.0),
                          child: new Icon(Icons.person)
                        ),
                        new Padding(
                          padding: new EdgeInsets.all(7.0),
                          child: new Text(
                            'Welcome',
                            style: new TextStyle(fontSize: 25.0),
                          ),
                        ),
                        
                      ],
                    ))
              ],
            ),
          ),
          SizedBox(
              height: 10.0,
            ),
          Card(
            color: Color(0xFFF5F7FB),
            child:  Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
              Center(child: Padding(padding: EdgeInsets.all(10.0),
              child: Text('You have crafted notes',style: TextStyle(fontSize: 20),)))
            ],)),
            SizedBox(
              height: 40.0,
            ),
            Center(
                child: Column(
                children: [
                Center(
                    child:ElevatedButton(onPressed: () {  },
                    style: ElevatedButton.styleFrom(
                      primary: Color(0xFF417BFB),
                      
                      textStyle:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.bold)), 
                    child: Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text('Sign Out',style: TextStyle(fontSize: 30),)),
                    )
                ),
              ],
            )),
          ],
        ),
      ),
    );
  }
}