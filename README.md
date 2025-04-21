# Del 1 Moment 2
Denna del av uppgiften består av att skapa REST-webbtjänst som hanterar data om arbetserfarenheter. 
Den är bygg med hjälp av Express, Node.js och använt PostgreSQL-databas.

## Länk till API
APIet finns på denna URL: [http://localhost:3000/workexperience]

## Installation, databas
APIet använder en PostgreSQL databas. För att hämta källkoden kör man först npm install för de nödvändiga npm-paketen. Install.js är installations-skript.
Skriptet skapar databastabeller som ser ut som nedan:

| Fält              | Datatyp       |
|-------------------|---------------|
|**id**             | SERIAL(INT)   |
|**companyname**    | VARCHAR(200)  |
|**jobtitle**       | VARCHAR(200)  |
|**location**       | VARCHAR(200)  |
|**startdate**      | DATE          |
|**enddate**        | DATE          |
|**desciption**     | TEXT          |

### Användning
Nedan beskrivs metoder på hur man använder APIet:

| Metod             | Ändpunkt              | Beskrivning                                       |
|-------------------|-----------------------|---------------------------------------------------|
|GET                | /workexperience       | Hämtar alla erfarenheter som är tillgängligt      |
|POST               | /workexperience       | Lägger till ny erfarenhet                         |
|PUT                | /workexperience/:id   | Uppdaterar erfarenhet efter ID                    |
|DELETE             | /workexperience/:id   | Radererar en erfarenhet med ID                    |


En erfarenhet returneras i JSON-format och har följande struktur:

``` 
{
"id": 1,
"companyname": "Stora Coop",
"jobtitle": "Deli-disk",
"location": "Kalix,
"startdate": "2016-05-19",
"enddate": "2020-08-29",
"desciption": "Sålde chark, ost och färdig mat från delikatessdisken."
}
