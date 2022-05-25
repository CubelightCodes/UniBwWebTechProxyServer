# UniBw WebTech ProxyServer

## Wieso brauche ich das?
Wahrscheinlich weil ihr keine HTTP-Anfrage an die API machen könnt. Da die öffentliche DSpace API und die Uni-Interne DSpace API keine explizite Policy besitzen, die den Browsern mitteilt, dass es zulässig ist, dass externe Clients auf die API zugreifen, verbietet der Browser den Zugriff darauf. Dieses Problem macht sich dadurch bemerkbar, dass in euren Konsolen, beim Versuch Daten von den APIs zu fetchen ein CORS-Fehler (Cross Origin Ressource Sharing) geworfen wird.

## Wie funktioniert das?
Der Proxy-Server ist einfach ein lokaler "Webserver", der mithilfe von Express.js euch eure eigene API zur Verfügung stellt, und somit von euch auch die CORS-Policies modifizierbar sind. Dieser Server handelt einfach als Zwischeninstanz und macht die HTTP-Anfragen an die vorher im Code definierte DSpace-API. Ihr könnt die gleichen Endpoints benutzen:

### Beispiel:
`https://webtech.informatik.unibw-muenchen.de/server/api/core/communities` wird dann über den Proxy-Server (sofern ihr den Port bei 5000 belasst) so angesprochen `localhost:5000/communities`

Der Proxy Server erlaubt alle beliebigen Anfragen an ihn, und macht einfach den HTTP-Request an den DSpace-API-Server. Deshalb ist es wichtig, dass ihr auch den gleichen Endpoint verwendet.

### Beispiel:
`localhost:5000/communitiesXYAWTRASF` führt dazu, dass exakt dieser Request beim DSpace-Server ankommt: `https://webtech.informatik.unibw-muenchen.de/server/api/core/communitiesXYAWTRASF`. Das wird nicht funktionieren. 

(Übrigens kann man diesen Proxy-Server für jede beliebige API benutzen, man muss nur die URL in der `index.js`-Datei verändern)

## Wie installiere ich den Proxy-Server
Hier wird davon ausgegangen, dass ihr NPM schon installiert habt und eure Angular Anwendung auch schon existiert

1. Git-Repo klonen und entweder in einen seperaten Ordner oder als Unterordner unter euer Assignment
2. Im Terminal in eurem Ordner für den Proxy-Server `npm install express --save`
3. Im Terminal in eurem Ordner für den Proxy-Server `npm install cors`
4. Im Terminal in eurem Ordner für den Proxy-Server `npm install axios`
5. Den Express-Server kann man dann im Terminal mit `node index.js` starten (Hinweis man kann ihn aktuell nicht so leicht stoppen. Einfach entweder als Prozess deaktivieren, den PC neustarten oder sich eine eigene Methode dazu schreiben)
6. Zum prüfen, ob er online ist einfach im Browser `http://localhost:5000/BELIEBIGER_ENDPOINT` eingeben.
![image](https://user-images.githubusercontent.com/72654359/170254930-23438150-9ef7-4487-8a21-ecf0207930ca.png)


## Wie mache ich dann in Angular meine HTTP-Anfrage
![image](https://user-images.githubusercontent.com/72654359/170254270-70c75c00-5d7f-4bc9-8705-9786b0a4ead4.png)

Einfach das selbe Prozedere wie beim normalen API-Zugriff, nur ersetzt ihr die Adresse der DSpace-API durch `http://localhost:5000/BELIEBIGER_ENDPOINT`
Es kann natürlich auch der Angular HTTP-Client oder Axios, oder jede andere beliebige Methode für HTTP-Requests benutzt werden

## (Optional) Wie konfiguriere ich den Proxy-Server
Die URL und den localhost-Port kann man in der `index.js`-Datei anpassen. Das ist nur notwendig, wenn ihr auf 5000 etwas anderes laufen lassen wollt, oder diese Proxy für eine andere API nutzen wollt.
