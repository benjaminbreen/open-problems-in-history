# Which open historical questions are most promising for agent-led research?

Rate all 72 questions as written. Imagine commissioning the same capable research team for each. It can search public digital collections, read scans, transcribe, write code, delegate work, and check results against original sources. It can follow promising leads across sessions. Assume today’s tools and public sources, with no fixed time limit. New scans, private access, laboratory work and fieldwork are outside its reach.

You are forecasting the research. Use this packet and your general knowledge. Keep browsing, shared project files and cross-chat memory off. The questions are in shuffled order. Consider the whole list before finalizing your scores.

Give three judgments for each question.

1. **Chance of a convincing answer (0–100%).** How likely is the team to reach an answer another historian could check? Either a positive or a negative answer can count when the evidence supports it. A promising lead alone leaves the question open.
2. **Contribution to historical knowledge if answered (1–10).** What would historians know, or know more securely? Use 1 for a small factual refinement, 5 for a substantial change in a specialist explanation, and 10 for a revision with consequences across several historical debates. A question about one person or community can score highly.
3. **Value for further research if answered (1–10).** What other work would become possible? Use 1 for little additional use, 5 for opening a specific source or line of inquiry, and 10 for opening a substantial body of evidence to many investigations.

Both impact scores assume a convincing answer. Keep them independent of how likely it is. Ties are fine. Give a brief reason covering the decisive evidence or gap, what an answer would change, and any follow-on use.

Return one JSON object with your model/version and one row per ID, in packet order. Replace the nulls with whole-number scores. Disclose any prior exposure to rankings of these questions. The organizer will rank by chance × historical contribution and, separately, by chance × value for further research.

```json
{"model":"your model/version","prior_exposure":"none or brief disclosure","ratings":[
  {"id":"question-id","chance_pct":null,"historical_contribution":null,"further_research":null,"reason":"Your brief judgment."}
]}
```

## Questions

1. **Where is leaf 170 of the Archimedes Palimpsest?** (`archimedes-leaf-170`)  
   A 1906 photograph records the missing leaf’s text, ruling and damage. Only part of the correspondence about its ownership is accessible online.

2. **Did Vermeer use a camera obscura or other optical aids?** (`vermeer`)  
   Museum images, technical studies and a household inventory survive. Perspective geometry and focus effects have received competing explanations, and no document records Vermeer using an optical device.

3. **In what year did the Zhou conquer the Shang?** (`zhou-conquest`)  
   Bronze inscriptions, king lists, astronomical references and published radiocarbon dates survive. Their implications depend on disputed calendar conventions and identifications of celestial events.

4. **Whose voices survive on unidentified early wax cylinders?** (`wax-cylinder-voices`)  
   Public cylinder transfers, discographies and family papers preserve audible and documentary clues. Frederick Dent Grant is already a candidate for one Vienna voice, with independent confirmation still open.

5. **Where was Yamatai, the realm of Queen Himiko?** (`yamatai`)  
   A Chinese account gives directions and travel times. Digitized Japanese site reports contain dated settlements, tombs and imported objects. Literal readings of the itinerary lead offshore.

6. **Which volcano produced the sulfate deposit dated to around 1809?** (`eruption-1809`)  
   Ice cores date the atmospheric event. An 1836 account places a Javanese eruption in December 1808, while the Latin source it cites gives November 1818.

7. **What do the thousands of unread Shang oracle-bone graphs mean?** (`oracle-bones`)  
   Digital collections include photographs, rubbings and indexed graphs from Shang divination records. Many unread signs occur rarely or only in names.

8. **Does the Indus script encode language, or a non-linguistic sign system?** (`indus`)  
   Digital corpora record signs and their order on seals and other objects. Inscriptions average about five signs, which makes comparisons with known writing systems difficult.

9. **How literate was the population of late imperial China?** (`qing-literacy`)  
   Digitized contracts preserve signatures, scribes’ handwriting and personal marks. Signing one’s name and reading prose reflect different abilities, and the contracting population was selective.

10. **How many people lived in the Americas in 1492?** (`americas-1492`)  
   Tribute lists and missionary counts often begin after epidemics had already reduced populations. Archaeological settlement estimates cover different regions and dates.

11. **Where was the land of Punt?** (`punt`)  
   Egyptian reliefs depict expeditions and imported goods. Archaeological reports and published provenance studies place some imports regionally, although goods could travel through intermediate ports.

12. **Did Cassini see the star that exploded in Cassiopeia in the 1670s?** (`cassini-cas-a`)  
   A 1671 printed report mentions Cassini observing previously uncounted stars. His Paris observing journals survive online, but identifying one star requires enough positional detail.

13. **Did Ptolemy observe the Almagest star catalogue or adapt Hipparchus's?** (`ptolemy`)  
   Ptolemy’s catalogue preserves coordinates for about 1,025 stars. Only fragments of Hipparchus’s earlier observations survive, while modern star positions can be calculated for both eras.

14. **How common was sleeping in two shifts before industrialization?** (`segmented-sleep`)  
   Digitized books, diaries and court testimony describe waking from a “first sleep.” Printed examples include repeated quotations, translations and exceptional nights.

15. **When did the thylacine go extinct in the wild?** (`thylacine`)  
   Digitized Tasmanian newspapers, bounty records and graded sighting databases span different periods. Published extinction estimates change substantially with the reliability assigned to later sightings.

16. **When was the consonantal text of the Qurʾān standardized?** (`quran-standardization`)  
   Early Qurʾān fragments, photographs and published dating results cover several collections. Parchment dates can precede writing, and coverage of early variants is uneven.

17. **How many people did the Justinianic Plague kill, and did it change late antique society?** (`justinianic-plague`)  
   Published burial studies identify plague. Digitized papyri, laws, inscriptions and pollen records cover different regions and give indirect evidence about deaths and social disruption.

18. **Which Atlantic shipments can be linked to Europe’s first potato blight outbreaks?** (`potato-blight-ships`)  
   Digitized agricultural letters, port reports and newspapers document shipments and early European outbreaks. Cargo origins, intermediate ports and deliveries to individual farms can be difficult to connect.

19. **Did the Black Death reach sub-Saharan Africa in the fourteenth century?** (`black-death-africa`)  
   Medieval accounts and published burial studies cover parts of Africa unevenly. Many settlements show abandonment without preserving evidence that identifies its cause.

20. **How much American silver reached China between 1550 and 1800?** (`silver-china`)  
   Treasury, mint and shipping records cover several routes at uneven intervals. Smuggling went unregistered, and Japanese silver also entered the Chinese market.

21. **What language does Linear A record, and can any proposed family beat chance?** (`linear-a`)  
   Searchable transcriptions and sign images survive for roughly 1,500 mostly short administrative documents. Proposed readings depend partly on sound values borrowed from Linear B.

22. **What do James Wilkinson's unread coded dispatches to Spanish officials say?** (`wilkinson-ciphers`)  
   Published code–word pairs and digitized dictionaries permit edition comparisons. Some letters have contemporary readings, while access to surviving originals varies.

23. **Did the age groups most at risk of dying change between waves of the “Russian flu”?** (`russian-flu`)  
   Digitized London reports and Danish burial records preserve age-specific deaths during successive waves. Age brackets, population structure and recorded causes differ across cities.

24. **Do old drawings show Jupiter’s Great Red Spot between 1713 and 1831?** (`jupiter-red-spot`)  
   Paris and Marseille observatory archives preserve dated drawings. Dark marks can represent different features, and the part of Jupiter visible changes as the planet rotates.

25. **Did anyone write down the Aceh tsunamis of c. 1394 and c. 1450?** (`indian-ocean-tsunamis`)  
   Coastal deposits and archaeology date two destructive waves. Searchable Ming court records and regional chronicles survive, with uneven geographic coverage and dating.

26. **How did a dodo become the subject of a Mughal painting?** (`mughal-dodo`)  
   A 1615 ship’s journal records dodos taken on Mauritius. Peter Mundy later described live dodos in Surat. Neither record traces a particular bird to the Mughal painter.

27. **Where was Agade, the capital of the Sargonic empire?** (`agade`)  
   Cuneiform texts place Agade near other cities, and satellite images preserve ancient river courses. No inscription naming Agade has been found at its original site.

28. **Were real wages in the Yangzi delta and Bengal comparable to England's before 1750?** (`great-divergence`)  
   Digitized grain prices, scattered wage quotations and company accounts survive. Occupations, payment in kind and the cost of comparable household goods vary across the three regions.

29. **What is the absolute chronology of early second-millennium BCE Mesopotamia?** (`mesopotamian-chronology`)  
   King lists, astronomical observations, tree rings and published radiocarbon dates supply chronological anchors. Several astronomical texts survive only in later, damaged copies.

30. **What texts did Newton copy in the alchemical manuscripts whose sources are unidentified?** (`newton-alchemy-sources`)  
   Digital editions transcribe Newton’s notebooks and identify many of his sources. Unattributed passages use wording and procedures that recur across multiple authors.

31. **How much of the cacao along Amazonian rivers grew from colonial-era plantings?** (`amazon-cacao`)  
   A digitized 1774–75 Rio Negro survey names settlements. Forest plots record cacao abundance today. Beans shipped from a village could have grown elsewhere.

32. **How did smallpox reach Aboriginal communities around Sydney in 1789?** (`sydney-smallpox`)  
   Dutch company records document smallpox in the Indonesian archipelago in the 1780s. Sydney accounts describe the later outbreak. The intervening chronology remains incomplete.

33. **How, if at all, did Copernicus learn of the Maragha-school planetary models?** (`copernicus-maragha`)  
   Some Islamic, Byzantine and European astronomical manuscripts are digitized, as are books Copernicus annotated. The mathematical parallels are known. Their route of transmission remains uncertain.

34. **What caused the cocoliztli epidemics of 1545 and 1576 in New Spain?** (`cocoliztli`)  
   Nahua and Spanish accounts describe symptoms and deaths. Published findings from epidemic burials cover limited places and dates across the two outbreaks.

35. **Was rongorongo an independent invention of writing?** (`rongorongo`)  
   Photographs and transcriptions survive for roughly two dozen inscribed Rapa Nui objects. The age of the wood can differ from the date of carving.

36. **Were Moses Shapira's Deuteronomy fragments an ancient text or an 1880s forgery?** (`shapira-scrolls`)  
   The leather strips disappeared after their nineteenth-century sale. Surviving transcriptions, sketches and reports differ in detail, and some relevant archival papers remain offline.

37. **Can the Meroitic language be translated beyond its funerary formulae?** (`meroitic`)  
   An online inscription repertory and museum images preserve texts from Kush. Many sound values are known, but long bilingual texts and well-understood non-funerary passages are scarce.

38. **Which lost works of Galen survive unrecognised in Arabic and Syriac?** (`galen-arabic`)  
   A ninth-century translator listed Galenic works known to him. Digital editions, quotations and manuscript images preserve possible witnesses, sometimes under other titles.

39. **How many people lived in China around 1600, and how many died between 1620 and 1680?** (`china-1600`)  
   Local gazetteers record taxes, land and households. Official Ming population totals often preserved old fiscal quotas, and local records survive unevenly through the wars.

40. **When was Beowulf composed?** (`beowulf`)  
   The sole manuscript was copied around 1000 and has been digitally imaged. Linguistic and metrical features can reflect both composition and later copying.

41. **How large was the Roman citizen population in the late Republic and under Augustus?** (`roman-census`)  
   Surviving texts give census totals with a fourfold jump under Augustus. Regional archaeological surveys provide settlement evidence, but differ in how they recorded small sites.

42. **Did Europe’s three great medieval cattle plagues come from the east?** (`medieval-cattle-plagues`)  
   Digital Latin, Arabic and Irish chronicles record animal deaths. Some notices describe famine or weather damage, omit the location, or repeat an earlier account.

43. **Who supplied the medical knowledge that Hans Sloane's catalogues attribute to unnamed people?** (`sloane-informants`)  
   Digitized catalogues, specimen labels and correspondence often name the European intermediary. A single entry may combine knowledge from several unnamed suppliers.

44. **How many people were carried in the Indian Ocean slave trades, 1500–1850?** (`indian-ocean-slave-trade`)  
   Dutch company and Cape records document some voyages and transfers. Portuguese and French holdings are partly digitized, and local carriers left uneven records.

45. **How did Gutenberg cast his type?** (`gutenberg-type`)  
   High-resolution copies of early Mainz printing show variation within a single letter. Inking, wear, pressure and photography can also change a letter’s appearance.

46. **Which of the journeys in Ibn Baṭṭūṭa's Riḥla did he actually make?** (`ibn-battuta`)  
   Digitized Arabic texts contain passages the travel narrative shares with earlier authors. Independent records placing the traveller at a particular stop are much scarcer.

47. **Which earthquake sent waves up the Padang River in 1697?** (`padang-1697`)  
   A digitized Dutch dispatch describes repeated surges at several places. Wave heights are uncertain, and the published coral evidence permits more than one rupture interpretation.

48. **Did Kerala-school infinite series reach early modern Europe through Jesuit missionaries?** (`kerala-jesuits`)  
   Kerala mathematical texts predate the European results. Jesuit correspondence survives in print, scans and undigitized volumes. The mathematical resemblance alone leaves transmission unresolved.

49. **Which lost silent films survive in fragments whose titles are unknown?** (`silent-film-fragments`)  
   Eye Filmmuseum footage, copyright synopses and the digitized trade press preserve clues. One apparent identification had already been published under a different catalogue description.

50. **How many Indigenous people were enslaved in the Americas between 1492 and 1900?** (`indigenous-slavery`)  
   Freedom suits, sales and mission records survive in partly digitized American and Iberian archives. Legal restrictions encouraged euphemisms, and record coverage varies sharply by region.

51. **Which cultivated toromiro trees descend from wild Rapa Nui collections?** (`toromiro-provenance`)  
   A herbarium voucher identifies a particular Melbourne garden bed. Accession and donor records are partly digitized, and some specimens have uncertain dates or identifications.

52. **What did Nahua writers say about the people Spaniards described as having leprosy?** (`leprosy-americas`)  
   The Digital Florentine Codex places Nahuatl and Spanish passages side by side. Dictionaries, ritual descriptions and accounts of actual patients represent different kinds of evidence.

53. **Which old books preserve overlooked word lists from little-documented languages?** (`hidden-vocabularies`)  
   Digitized travel books and natural histories contain word lists outside their titles or indexes. An existing catalogue covers 42 languages. Some later lists copy earlier publications.

54. **Did the population of Ottoman Anatolia collapse in the late sixteenth and seventeenth centuries?** (`ottoman-tahrir`)  
   Surviving registers record taxable households and settlements. The types of tax register and the units counted changed during the period of apparent population decline.

55. **Do khipus record more than numbers, and can their non-numerical signs be read?** (`khipu`)  
   Public databases describe knots, colours and cord structures. Few surviving examples can be paired securely with colonial documents recording the people or goods involved.

56. **Did James Pawpaw’s remedy enter Sloane’s collection without his name?** (`james-pawpaw-remedy`)  
   A digitized 1736 printed recipe names Pawpaw. An anonymous Sloane manuscript shares ingredients and wording, while its route into the collection remains uncertain.

57. **When did Europeans first describe the outbreak later called syphilis?** (`early-syphilis`)  
   Digitized early printed accounts and manuscript catalogues preserve contemporary terms for the illness. Several apparently early cases were described decades afterward.

58. **Who grew and smoked cannabis on Ternate in 1676?** (`ternate-gingie`)  
   Two digitized Dutch records document a February 1676 decision and proclamation on Ternate. They record officials’ intentions and give little evidence about growers or enforcement.

59. **How many early printed editions have been lost without trace?** (`lost-editions`)  
   Early-print catalogues, inventories and newly identified fragments record successive discoveries. Cheap, ephemeral formats had different chances of survival and of being catalogued.

60. **Did Gregorian chant descend from Old Roman chant, or did both come from a common ancestor?** (`gregorian-chant`)  
   The traditions share texts and melodies. Early Frankish books often give words alone, and the surviving Old Roman melodies were written down centuries later.

61. **How much iron did Song China produce in the eleventh century?** (`song-iron`)  
   Digitized fiscal compilations record iron receipts by locality. Collection rates are disputed, and published archaeological production evidence covers only some sites.

62. **How many people were killed in the Irish rising of 1641?** (`irish-1641`)  
   Trinity College Dublin has digitized about 8,000 depositions. They include eyewitness reports, repeated hearsay and overlapping victim counts. Coverage of Catholic deaths differs.

63. **Are Borneo’s wild elephants native, or descendants of a royal gift?** (`borneo-elephants`)  
   Searchable Dutch East India Company records mention elephants at Javanese courts, including imported animals. Their presence there leaves the proposed journey through Sulu to Borneo undocumented.

64. **Which manuscript fragments from Dunhuang fit back together?** (`dunhuang-fragments`)  
   The International Dunhuang Programme brings together images from dispersed collections. Repeated passages occur in different copies, and image quality varies.

65. **Which Hittite tablet fragments belong to the same tablet or preserve the same text?** (`hittite-fragments`)  
   TLHdig provides searchable sign transcriptions. Museum photographs cover only part of the corpus. Distinct tablets can preserve copies of the same passage.

66. **Were Mendel's pea-hybrid data too close to expectation, and if so, why?** (`mendel`)  
   Mendel’s published counts can be reanalysed. Few working records survive to show how he classified ambiguous plants or chose which experiments to report.

67. **Do the missing voices of Renaissance songs survive in lute arrangements?** (`renaissance-lute`)  
   A rediscovered tenor partbook is digitized in Bern. Catalogues and surviving lute arrangements offer comparisons, although arrangers could change individual vocal lines.

68. **By what route did knowledge of gunpowder reach Latin Europe in the thirteenth century?** (`gunpowder`)  
   Chinese, Arabic and Latin texts survive from different dates. Some manuscripts are digitized, but the intermediate translations and contacts connecting the traditions remain uncertain.

69. **Why did plague disappear from western Europe after the early eighteenth century?** (`plague-disappearance`)  
   Dated outbreak records and some port health records are online. Quarantine and exposure records survive unevenly, including across ports with different epidemic histories.

70. **Which women wrote the unsigned stories in nineteenth-century newspapers?** (`anonymous-serials`)  
   Digitized newspapers preserve different printings of the same story, sometimes with a byline. Syndicated copies can repeat the same mistaken attribution.

71. **Does Proto-Elamite record language, and is it the ancestor of Linear Elamite?** (`proto-elamite`)  
   Images and transliterations cover a large collection of early Iranian accounting tablets. Numerical signs are understood more securely than the other signs or their later counterparts.

72. **Who printed the anonymous and false-imprint books of eighteenth-century Britain?** (`anonymous-imprints`)  
   Scanned books preserve distinctive damage to type and ornaments. Signed editions offer comparisons, although access to some large image collections requires a subscription.
