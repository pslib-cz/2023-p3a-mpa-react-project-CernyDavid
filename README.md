# Název

## Téma

Jedná se o "RPG klikačku", kde hráč získává herní měnu klikáním na určité místo. Za danou měnu potom kupuje (staví) a vylepšuje budovy ve své pevnosti (např. zbrojírna, kasárny...). Tím hráč vylepšují svou armádu a automatické produkci herní měny. Se svou armádou poté může bojovat proti NPC nepřátelům (automatické souboje, šance na výhru závisí na statech), čímž hráč zvyšuje svůj level a odemyká další vylepšení.  
Hra nemá konec, lze ji hrát "donekonečna". Cílem je získat co nejvyšší level a porazit co nejvíce nepřátel.  
(Jedná se o jakýsi hybrid "idle klikaček" jako je Cookie Clicker a webových "levelovacích" RPG jako Shakes & Fidget.)

## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace
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
