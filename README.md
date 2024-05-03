# Space Machinist
## Téma

Jedná se o "RPG klikačku", kde hráč získává suroviny klikáním na určité místo. Za dané suroviny potom kupuje (staví) a vylepšuje budovy ve své pevnosti (např. zbrojírna, kasárny...). Tím hráč vylepšuje svou armádu a automatizuje produkci surovin. Se svou armádou poté může bojovat proti NPC nepřátelům (automatické souboje, šance na výhru závisí na statech). 
Hra nemá konec, lze ji hrát "donekonečna". Cílem je odemknout co nejvíce vylepšení a porazit co nejvíce nepřátel.
(Jedná se o jakýsi hybrid "idle klikaček" jako je Cookie Clicker a webových "levelovacích" RPG jako Shakes & Fidget.)  
[HRÁT](https://pslib-cz.github.io/2023-p3a-mpa-react-project-CernyDavid/)
## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace - [link](https://www.figma.com/file/Ud7NXo1EMW25QHoo9L6A27/React-project?type=design&node-id=0-1&mode=design&t=GdXxIi0Gb55nIwbv-0)
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
