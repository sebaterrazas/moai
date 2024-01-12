import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            IconButton(
              icon: SizedBox(
                width: 60, 
                height: 60,
                child: Image.asset('assets/images/icon.png'),
              ),
              onPressed: () {
                // Handle the home button press
              },
            ),
            IconButton(
              icon: SizedBox(
                width: 50, 
                height: 50,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(25), // Half of the width and height
                  child: Image.asset(
                    'assets/images/me-yatch.jpeg',
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              onPressed: () {
                // Handle the settings button press
              },
            ),
          ],
        ),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      backgroundColor: Theme.of(context).primaryColor,
      body: Container(
        alignment: Alignment.topCenter,
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 0.9,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20
                ),
                Text(
                  'Past Trips',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Theme.of(context).colorScheme.secondary),  
                ),
                SizedBox(
                  height: 150,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: yourListFromBackend.map((item) {
                      return SizedBox(
                        height: 150,
                        width: 200, // Define your desired width here
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                          margin: const EdgeInsets.all(10.0),
                          child: ListTile(
                            title: Text(item.title), // Replace with the actual property of the item
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
                Text(
                  'Shared Trips',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Theme.of(context).colorScheme.secondary),
                ),
                SizedBox(
                height: 150,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: yourListFromBackend.map((item) {
                    return SizedBox(
                      height: 150,
                      width: 200, // Define your desired width here
                      child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        margin: const EdgeInsets.all(10.0),
                        child: ListTile(
                          title: Text(item.title), // Replace with the actual property of the item
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your logic here
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
