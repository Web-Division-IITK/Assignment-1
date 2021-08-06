import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:noted/ui/note_model.dart';
import 'package:http/http.dart';
class ApiCall extends StatelessWidget {
  const ApiCall({ Key? key }) : super(key: key);

  void getNotes() async{
    var response= await Dio().get('https://immense-castle-94326.herokuapp.com/aliens/');
    print(response);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ElevatedButton(
        onPressed: () {
          getNotes();}, 
        child: null,),
      
    );
  }
}
