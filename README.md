# IntelligentPoliciesBuilder

The advantages of such a system are evident. Firstly, the life insurance business would benefit because their goal is to have the healthiest clients possible – in order to gain money as long as the clients are alive. Additionally, the system developed has taken into consideration cost – it is developed on the most popular mobile platforms (iOS, Android), having only one code base. Secondly, the insurance clients would benefit not only from getting discounts to future subscription fees, but also from getting to use an application which shows health information like daily number of steps, last workout calories burned or analytics for heart rates monitor. Additionally, by using such applications, they could find motivation to increase their fitness level and change their life style into a healthier one.


The insurance policies builder system is built from three major parts:
•	The wearable application: Registers user’s activity and sends it to the database; whenever the user wants to see their activity, they can see it directly on the wearable application or, they can open the mobile application and see it( the application sends requests to the database to retrieve the data posted by the wearable).
•	The mobile application: Retrieves the data stored in the database and presents it to the user in a modern, responsive way.
•	The database application: Handles the data storage. Essentially it stores the data from the wearable application and presents it to the mobile application so that the user could see relevant details. 

The system is available to the following platforms:
Native mobile application: iOS (e.g. iPhone X), Android (e.g. Google Pixel)
Native watch application: Tizen OS (e.g. Samsung Galaxy Watch)

The communication between these components is being done via the HTTP protocol.

The tools used for the development of the systems are as follows:
•	Visual Studio code for mobile and server development
•	Tizen Studio for wearable application development
•	MongoDB Atlas for managing the complex tasks regarding server analytics and deployment
•	iOS, Android and TizenOS emulators for simulating the applications on virtual devices
•	The server application has been deployed with the help of a free Heroku plan which offers 100% up time


The intelligent insurance policies builder system is a solution which helps insurance companies adopt the technological trend, which in 21st century proves to be decisive. A summary of the advantages of such a solution:

-	It gathers consumer data which help the company get live feedback regarding uses of such system
-	It creates a will to become healthier, more active among the consumers because the application is gamified (for example the usage of points and achievements)
-	The consumers are obliged to adopt a healthier lifestyle in order to reduce the costs of the subscription fee. The healthier the client, the more he lives, the more he pays subscription fees.
-	It attracts more people because the idea is innovative, the market has not many solutions like this  

However, because the technology is a doubled edged sword, it has its drawbacks which, of course, are inherited by this application:

-	Some consumers might think that such a system is too obtrusive, it collects too many data regarding their private lifestyle
-	Some consumers might be concerned regarding the way the company handles the data, are there any guarantees that this data won’t be sold to other third parties? Are there any guarantees that the data is safely being stored and its sole purpose is to offer discounts and vouchers?

Regarding these drawbacks, further research might be needed, research which should clearly focus on the security of the data collected by the companies:

-	What security solutions are the bigger companies using?
-	How can a cybernetic attack be avoided?
-	What are the implications of being attacked and having data leaks?

When it comes to further development of this system, I do think that it could be enhanced in many ways. The most obvious way is to make it more automatized such that the wearable device to learn the usage patterns of the user and to trigger the data synchronization (which in the current implementation is being done manually by the user) via machine learning tools. For example, the application observes that the user usually has a walk in the evening and then he goes to sleep; in this situation, the application could use the time between the end of the walk and the start of his sleep and begin an automatic sync of the gathered data with the server. Furthermore, depending on the wearable devices available, and the advancement of devices in the future, the system could be enhanced by the addition of several sensors. For example, future watches could possibly record users’ sleep details. These data could contribute to the number of points gathered by the user and the insurance company would get a more accurate representation of the health level of the user – more accurate vouchers offered.

As a conclusion, the developed insurance policies builder system is a complete one: it offers not only a wearable device application which gathers information about user’s activity level (number of steps performed, number of calories burned and so on) and a modern, responsive and easy to use mobile application which entertains the user with smooth animations, but also a server system which handles the collection of data provided by the wearable application and offers analytics information to the mobile application. The system relevance is given by the fact that the insurance companies need to adopt the tech trend as soon as possible, they need to embrace the change of technology because the advantages clearly outweigh the disadvantages. The implementation of such a system could be costly on the short term because of the need of investments, but on the long term the profits could be huge.

