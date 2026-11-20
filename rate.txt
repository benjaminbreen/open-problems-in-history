# Which historical questions could a research team answer using today’s digital sources?

Round `2026-11-20-r2` · 71 questions

Imagine the same team of historians and AI agents investigating each question. They can search public digital collections, read scans, transcribe, write code, divide up work and check results against originals. They can follow specific leads across sessions with no fixed time limit. Assume today’s tools and public sources. New digitization, private holdings, bespoke specialist work, laboratory work and fieldwork are outside the scope.

Each brief describes what is known, identifies sources and suggests one way to investigate. Judge the question as written. You may see a better approach. A catalogue entry may describe material that can only be consulted in person.

Give three judgments for each question.

1. **Chance of a convincing answer (0–100%).** How likely is the team to reach an answer another historian could check? A well-supported negative answer counts. A promising lead alone leaves the question open.
2. **Historical contribution if answered (1–10).** What would historians know, or know more securely? Use 1 for a small factual refinement, 5 for a substantial change in a specialist explanation, and 10 for a revision with consequences across several historical debates. A question about one person or community can score highly.
3. **Value for further research if answered (1–10).** What other work would become possible? Use 1 for little additional use, 5 for opening a specific source or line of inquiry, and 10 for opening a substantial body of evidence to many investigations.

Both contribution scores assume a convincing answer. Judge each independently of its likelihood. Overall potential is the chance multiplied by historical contribution. The further research ranking multiplies the same chance by the value for further research.

## Returning a model ballot

Use this packet and your general knowledge in a fresh conversation with browsing, shared project files and cross-chat memory off. The links identify the sources described in each brief. Read the whole shuffled list before finalizing your judgments. Disclose any prior exposure to rankings of these questions.

Return one JSON object with all 71 IDs in packet order. Use whole numbers. Ties are fine. For each question, give a brief reason covering the decisive evidence or gap, what an answer would change, and any follow-on use.

```json
{"round_id":"2026-11-20-r2","model":"your model/version","prior_exposure":"none or brief disclosure","ratings":[
  {"id":"question-id","chance_pct":null,"historical_contribution":null,"further_research":null,"reason":"Your brief judgment."}
]}
```

## Questions

### 1. Which women wrote the unsigned stories in nineteenth-century newspapers? (`anonymous-serials`)

Nineteenth-century newspapers reprinted stories across cities and countries, sometimes dropping a byline or substituting a pen name. Following an unsigned story back through digitized newspapers could restore work to a woman whose publications have been overlooked. Editors also shortened stories, and a syndicate could distribute the same mistaken attribution to many papers.

**One way to investigate.** Search distinctive phrases across reprints, then inspect the page image to make sure a byline belongs to the story. Seek a copyright registration, publisher’s payment or other independent link between the text, the name and the author. Check the method on stories whose authors are already documented.

**Sources** [US newspaper collections](<https://www.loc.gov/collections/chronicling-america/>) · [Trove newspapers](<https://trove.nla.gov.au/search/category/newspapers>)

### 2. Whose voices survive on unidentified early wax cylinders? (`wax-cylinder-voices`)

Early wax cylinders preserve people whose names were never recorded or whose labels went astray. Public sound transfers sometimes contain spoken introductions. Programmes, recording catalogues and family papers can place a speaker at an event. Frederick Dent Grant has already been proposed for one Vienna recording, so the question there is how to confirm the identification.

**One way to investigate.** Transcribe names and distinctive phrases from the original transfer, then look for the same performance in dated programmes or a named recording. Have a listener check the words against the audio. A familiar-sounding voice or a later label copied from another catalogue offers limited independent support.

**Sources** [Edison recordings](<https://www.nps.gov/edis/learn/photosmultimedia/audio-wangemann-1889-1890-european-recordings.htm>) · [Cylinder Audio Archive](<https://cylinders.library.ucsb.edu/search.php?nq=1&query=cylinder14836&query_type=call_number>)

### 3. In what year did the Zhou conquer the Shang? (`zhou-conquest`)

King Wu’s defeat of the Shang anchors early Chinese chronology. China’s national chronology project chose 1046 BCE, but the surviving sources give several plausible years. Bronze vessels bear calendar dates, later chronicles list reigns, and excavated material supplies radiocarbon ranges. The ancient terms for phases of the moon admit different readings.

**One way to investigate.** Use the inscribed dates to reconstruct calendars under each plausible reading. Check which also fit independent astronomical observations and radiocarbon ranges. If a proposed year works only with one disputed translation or one version of a chronicle, show how far the date moves when that evidence is set aside.

**Sources** [Bronze inscriptions](<https://bronze.asdc.sinica.edu.tw/>) · [Historical texts](<https://ctext.org/zhushu-jinian>)

### 4. Which of the journeys in Ibn Baṭṭūṭa's Riḥla did he actually make? (`ibn-battuta`)

Ibn Baṭṭūṭa dictated an account of decades of travel in the fourteenth century. Scholars have shown that parts of it borrow from earlier authors, including Ibn Jubayr. Searchable Arabic texts reveal some of those parallels, while independent records of the traveller himself are scarce. A visitor could borrow a description of a place he had actually seen.

**One way to investigate.** First test a passage-matching search on established borrowings. For disputed journeys, look separately for independently dated officials, ceremonies or encounters that place the traveller there. Record separately what the author borrowed and what evidence places him at the site.

**Sources** [Digitized Arabic texts](<https://openiti.org/>) · [KITAB text-reuse research](<https://kitab-project.org/>)

### 5. Can the Meroitic language be translated beyond its funerary formulae? (`meroitic`)

Researchers can sound out the signs of Meroitic, a language of the ancient kingdom of Kush in northeast Africa. Familiar phrases on gravestones help identify names, family relationships and offerings. Royal and temple inscriptions are much harder to translate. Published photographs, transcriptions and museum records let readers compare words with the scenes and objects accompanying them.

**One way to investigate.** Build a small vocabulary and set of grammatical rules from the best-understood passages. Use them to predict the sense of a previously withheld inscription, then check the prediction against its setting and recurring expressions elsewhere. A translation should survive the loss of the picture that first suggested it.

**Sources** [Published Meroitic inscriptions](<https://www.persee.fr/doc/rem_0000-0000_2000_num_1_1_845>) · [British Museum objects](<https://www.britishmuseum.org/collection>)

### 6. How much iron did Song China produce in the eleventh century? (`song-iron`)

A widely cited estimate puts Chinese iron production in 1078 at about 125,000 tons. It comes largely from Song government accounts that recorded what officials collected from iron producers. Turning receipts into total output requires knowing whether a figure was a quota, a tax payment or the production of a particular works. Published excavations provide checks for some places.

**One way to investigate.** Trace the major figures back to their entries, recording the unit, district and fiscal rule in force. Calculate output under each defensible interpretation and compare the results with independent local accounts or furnace evidence. Show which districts and assumptions drive the national estimate.

**Sources** [Academia Sinica historical texts](<https://hanchi.ihp.sinica.edu.tw/>) · [Chinese Text Project](<https://ctext.org/>)

### 7. What do James Wilkinson's unread coded dispatches to Spanish officials say? (`wilkinson-ciphers`)

James Wilkinson, a US Army officer secretly paid by Spain, exchanged letters in which numbers could give a word’s position in a dictionary. Some letters have words written above the code. Using published transcriptions, researchers recovered about three quarters of the words in one test letter. Several printings of John Entick’s dictionary have since been checked. Some reproduce the word order, but none examined puts the known words in all the right places.

**One way to investigate.** Group letters by coding system. Use some known words to test page and column positions in scanned dictionary editions, reserving others as a check. An edition that predicts those withheld words could then be tried on an unread passage and checked against a correspondent’s reply.

**Sources** [Chu, Valenti and Knight’s study and dataset](<https://aclanthology.org/2020.emnlp-main.471/>) · [Dictionary copies examined](<https://historyproblems.com/leads/wilkinson-dictionary-b/dictionary-search.json>)

### 8. When was the consonantal text of the Qurʾān standardized? (`quran-standardization`)

Early Qurʾān manuscripts preserve a consonantal text to which readers supplied vowels. Tradition associates its standardization with the caliph ʿUthmān around 650 CE. Distinctive spellings shared across copies suggest a common written ancestor, but the surviving fragments cover different passages. Radiocarbon measurements date the animal skin, which could have been stored before use.

**One way to investigate.** Compare photographs of overlapping passages, recording rare shared spellings and corrections. Use independently dated manuscripts to test how early the common text must have circulated. Give separate weight to dates for parchment, dates for handwriting and later accounts of an official decision.

**Sources** [Corpus Coranicum](<https://corpuscoranicum.de/>) · [Birmingham manuscript](<https://www.birmingham.ac.uk/facilities/cadbury/birmingham-quran-mingana-collection/birmingham-quran/access-to-the-manuscript>)

### 9. Where was the land of Punt? (`punt`)

Egyptian rulers sent expeditions to Punt for incense, gold and other goods. Temple reliefs show the people, cargo and ships, but give few directions. Published studies of Egyptian baboon mummies and imported stone narrow the possible sources of some goods around the southern Red Sea. A trading port could sell goods brought from inland or across the sea.

**One way to investigate.** Map the published places of origin for several kinds of cargo, keeping their dates separate. Compare the overlap with contemporary ports and excavated trade goods on both shores. An argument for Punt’s location must distinguish where Egyptians traded from where a particular animal or stone originated.

**Sources** [Published Egyptian expedition reliefs](<https://archive.org/details/the-temple-of-deir-el-bahari-pt.-3>) · [Published baboon provenance study](<https://doi.org/10.7554/eLife.60860>)

### 10. Which manuscript fragments from Dunhuang fit back together? (`dunhuang-fragments`)

Fragments from Dunhuang, in western China, now sit in libraries thousands of miles apart. Scholars have already reunited pieces by matching their writing and torn edges. The International Dunhuang Programme makes images from different collections available together. Scribes often copied the same Buddhist passage, and some older photographs omit an edge or show only one side.

**One way to investigate.** Use repeated words or the continuation of a line to find possible neighbours. Compare tears, handwriting, line spacing and the reverse of each sheet, then check published joins. A newly verified pair could restore a passage or identify the manuscript to which an isolated scrap belonged.

**Sources** [International Dunhuang Programme](<https://idp.bl.uk/collection/>) · [Published fragment joins](<https://doi.org/10.3390/rel16111387>)

### 11. Who printed the anonymous and false-imprint books of eighteenth-century Britain? (`anonymous-imprints`)

Many eighteenth-century British books name a distributor, give a fictitious place of publication or omit the printer entirely. Signed books from known presses offer comparisons. Digitized pages preserve decorative blocks and damaged letters that could leave a recognizable mark in different books. Some large scan collections require a subscription, and equipment could change hands.

**One way to investigate.** Begin with publicly accessible signed editions to test whether recurring chips or cracks identify particular blocks. Look for those details in anonymous editions and check dates against ownership of the press. Several independent matches can support an attribution. A common decorative design alone could belong to many printers.

**Sources** [English Short Title Catalogue](<https://datb.cerl.org/estc/>) · [Compositor ornament database](<https://compositor.bham.ac.uk/>)

### 12. Were real wages in the Yangzi delta and Bengal comparable to England's before 1750? (`great-divergence`)

One argument about Europe’s industrial rise turns on whether workers in England could already buy more with their wages than workers in prosperous parts of China and India. Price lists survive, but wage quotations for the Yangzi delta and Bengal are scattered across accounts and regulations. Some rates included meals, and some were official allowances rather than payments.

**One way to investigate.** Match workers doing comparable jobs in the same decades and check what they actually received. Price a household’s food, fuel and cloth locally, allowing plausible substitutions. Test whether the difference persists across several account books and under different assumptions about the number of paid workdays.

**Sources** [Chinese economic records](<https://mhdb.mh.sinica.edu.tw/foodprice/about.php>) · [Dutch company accounts](<https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02>)

### 13. How many people were killed in the Irish rising of 1641? (`irish-1641`)

Witnesses to the Irish rising of 1641 left thousands of depositions, now digitized. Some name people killed, others repeat reports about whole groups. Early polemical totals were much higher than modern estimates. The collection records deaths among Protestant settlers more fully than deaths among Catholics, and deaths in flight present a separate counting problem.

**One way to investigate.** Link names, places and dates across statements, recording who actually saw each death. Use a second reader to check uncertain matches and group counts. Give a documented minimum and plausible bounds, distinguishing violent deaths from later deaths through exposure and stating whose losses the records can represent.

**Sources** [Trinity College Dublin’s 1641 Depositions](<https://www.tcd.ie/library/research-collections/subject-strengths/1641-depositions.php>) · [Irish Manuscripts Commission’s Dublin volume](<https://www.irishmanuscripts.ie/product/1641-depositions-vol-4-dublin/>)

### 14. Did Vermeer use a camera obscura or other optical aids? (`vermeer`)

A camera obscura projects a scene onto a surface. Some of Vermeer’s paintings show the soft focus and highlights such a device can produce. His household inventory lists no device. Museum images also show revisions beneath the paint and pinholes that a painter could have used to lay out perspective with string.

**One way to investigate.** Model the room in several paintings and predict where each technique would place edges, vanishing points and blurred details. Compare those predictions with museum scans, including paintings left out when building the model. A good visual imitation alone leaves open how Vermeer worked.

**Sources** [Mauritshuis paintings and research](<https://mauritshuis.nl/en/discover/exhibitions/the-girl-in-the-spotlight>) · [Technical study of Vermeer’s studio](<https://doi.org/10.5092/jhna.2022.14.2.3>)

### 15. Did anyone write down the Aceh tsunamis of c. 1394 and c. 1450? (`indian-ocean-tsunamis`)

Coastal deposits and ruined settlements show that large waves struck the coast of Aceh in northern Sumatra around 1394 and 1450. The trading port of Lamri had contacts across the Indian Ocean and with China. A contemporary written account could connect the physical destruction with what happened to the people and the port.

**One way to investigate.** Search the Ming court records and regional chronicles under the port’s different names, allowing a few years either side of each geological date. Check promising passages in the original language. A description of the sea entering a named settlement carries much more weight than a gap in tribute missions.

**Sources** [Translated Ming court records](<https://epress.nus.edu.sg/msl/>) · [Archaeology of Lamri](<https://doi.org/10.3406/befeo.2019.6298>)

### 16. Where is leaf 170 of the Archimedes Palimpsest? (`archimedes-leaf-170`)

A medieval scribe reused a manuscript of Archimedes for a prayer book. Several leaves later went missing. In Blois, a researcher identified leaf 123 by comparing it with a photograph taken in 1906. A photograph also survives for leaf 170. Finding the sheet could recover writing too faint to read in the old image.

**One way to investigate.** Trace sales and gifts through digitized catalogues and the available correspondence of former owner Anne Guersan. Look under descriptions of prayer books as well as mathematics. A candidate should match the photograph’s lines and distinctive damage, and a dated record should connect it to a present collection.

**Sources** [1906 photograph](<https://archimedespalimpsest.net/Data/170r-163v/170r-163v_Arch21r_Heiberg_visible_stitch.jpg>) · [Identification of leaf 123](<https://www.cnrs.fr/sites/default/files/press_info/2026-03/26_03_09_CP_palimpseste-archimede_vEN.pdf>)

### 17. Who grew and smoked cannabis on Ternate in 1676? (`ternate-gingie`)

In February 1676 Dutch officials on Ternate, an island in the spice-producing Moluccas, ordered the destruction of a plant they called gingie. A council decision and a public proclamation survive in digitized records. They show what officials intended. They say much less about who owned the gardens, who smoked the plant or what happened after the order.

**One way to investigate.** Follow the officials, named places and variant spellings through later council minutes, petitions and correspondence. Look for a dated inspection, complaint or dispute involving growers. Compare the language of enforcement with the original proclamation to distinguish a reported action from another copy of the same order.

**Sources** [Dutch East India Company records](<https://transcriptions.globalise.huygens.knaw.nl/detail/urn:globalise:NL-HaNA_1.04.02_1318_1656>) · [Searchable Dutch archival records](<https://www.openarchieven.nl/transcripties/toon/NL-HaNA_1.04.02_1318_1508>)

### 18. How many early printed editions have been lost without trace? (`lost-editions`)

Early printers issued books, pamphlets and single sheets that may survive in one copy or none. Catalogues, old inventories and fragments found in bookbindings offer glimpses of what disappeared. Cheap or heavily used works had different chances of survival from expensive volumes. The unit to count is an edition, however many copies it once had.

**One way to investigate.** Fit a model to a catalogue as it stood at an earlier date, then see how well it predicts editions discovered later, by format and genre. Compare its estimates with old inventories. Report how much the inferred total depends on publications that would be unlikely to leave even an inventory entry.

**Sources** [Incunabula Short Title Catalogue](<https://data.cerl.org/istc/_search>) · [Universal Short Title Catalogue](<https://www.ustc.ac.uk/>)

### 19. Did Gregorian chant descend from Old Roman chant, or did both come from a common ancestor? (`gregorian-chant`)

Gregorian chant as transmitted in Frankish lands shares words and musical phrases with the tradition called Old Roman chant. Surviving Roman books with melodies are later than the earliest Frankish witnesses. A late copy could preserve an older way of singing. Digital manuscript images and chant indexes let the same pieces be compared across books.

**One way to investigate.** Align the melodies of chants with the same words and look for recurring changes in phrase endings or ornament. Test competing family trees on chants omitted when building them. Allow for singers passing music by ear as well as scribes copying it, since both can produce local variants.

**Sources** [Vatican chant manuscripts](<https://digi.vatlib.it/>) · [Cantus Index and Database](<https://cantusdatabase.org/>)

### 20. Did the Black Death reach sub-Saharan Africa in the fourteenth century? (`black-death-africa`)

The Black Death is documented in fourteenth-century Egypt and North Africa. Farther south, some excavated settlements were abandoned around this time, and surviving texts occasionally describe sudden mortality. Drought, conflict and migration can leave similar traces. Digitized chronicles, manuscript catalogues and published excavation reports cover some regions much better than others.

**One way to investigate.** Build local timelines from independently dated records and look for a contemporary account that can be placed at a specific affected site. Compare alternative explanations for abandonment. Where existing burial studies and written accounts cannot distinguish the cause, record how much of the question would require new physical evidence.

**Sources** [Digitized African manuscripts](<https://www.vhmml.org/readingRoom/>) · [Endangered Archives Programme](<https://eap.bl.uk/>)

### 21. What language does Linear A record, and can any proposed family beat chance? (`linear-a`)

Linear A survives mostly in short administrative records from Bronze Age Crete. Some signs resemble signs in the later Linear B script, which writes Greek. Borrowing their sound values produces possible pronunciations, but many proposed links to other languages depend on a handful of similar-sounding words. Sign images and searchable transcriptions are available.

**One way to investigate.** Specify the sound correspondences and recurring word endings that one proposed language would predict. Test them on inscriptions held back from the comparison, then repeat with unrelated languages and shuffled sound values. Check readings against photographs wherever changing one damaged sign would change the result.

**Sources** [SigLA sign images](<https://sigla.phis.me/>) · [Linear A transcriptions](<https://lineara.xyz/>)

### 22. What is the absolute chronology of early second-millennium BCE Mesopotamia? (`mesopotamian-chronology`)

King lists and dated business tablets establish the order of many events around the time of Hammurabi, yet rival chronologies put those events decades apart on our calendar. Copies of observations of Venus can fit several astronomical cycles. Excavated timbers and published radiocarbon dates provide a different clock, if they can be tied to particular reigns.

**One way to investigate.** Build a timeline from linked reigns and named years, then fit each proposed calendar to it. Check the dates it predicts against the published timbers and dated archaeological layers. Repeat with disputed readings of damaged tablets removed to see which calendar choices the evidence really distinguishes.

**Sources** [British Museum tablets](<https://www.britishmuseum.org/collection/object/W_K-160>) · [Dating the wood samples](<https://doi.org/10.1038/s41598-020-69287-2>)

### 23. How large was the Roman citizen population in the late Republic and under Augustus? (`roman-census`)

A Roman census in 70/69 BCE recorded roughly 910,000 citizens. Augustus later reported over four million for 28 BCE. Scholars disagree over which people each total included, especially women and children. Resolving this would change estimates of Italy’s population. Inscriptions preserve the claims, and regional archaeological surveys offer independent evidence of settlement.

**One way to investigate.** Translate each interpretation into a population and an expected density of farms and towns in well-surveyed regions. Compare those predictions with dated sites, allowing for missed settlements and different survey techniques. Check whether the evidence can distinguish rival ways of counting citizens from actual population growth.

**Sources** [Roman census texts](<https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/2*.html>) · [Published archaeological surveys](<https://www.fastionline.org/survey/>)

### 24. How many people did the Justinianic Plague kill, and did it change late antique society? (`justinianic-plague`)

Plague struck the Mediterranean world from the sixth century onward. Published evidence from burials identifies the disease, while eyewitness accounts describe heavy losses in particular cities. Neither establishes a death toll for the whole region. Tax documents on papyrus, inscriptions, excavated settlements and pollen records capture different aspects of life before and after outbreaks.

**One way to investigate.** Choose regions with continuous records and date their outbreaks independently. Compare changes in taxpayers, cultivated land and settlements with earlier trends and places affected by war or drought. Report where several sources agree and where a gap in record keeping prevents a mortality estimate.

**Sources** [Papyrological Navigator](<https://papyri.info/>) · [Published research on the first pandemic](<https://doi.org/10.1016/j.jas.2026.106473>)

### 25. How many people lived in the Americas in 1492? (`americas-1492`)

Estimates of the population of the Americas in 1492 differ by tens of millions. Most surviving tribute lists, parish registers and colonial inspections counted people after epidemics and displacement had begun. Published settlement surveys and radiocarbon dates offer a partly independent record of where people lived, with uneven coverage across regions.

**One way to investigate.** Reconstruct regions separately. Where early counts and archaeological surveys overlap, test the household sizes and rates of population loss needed to reconcile them. Carry those ranges into the hemispheric total and show which regions dominate the uncertainty. A well-documented valley can anchor its own estimate more securely than its neighbours’.

**Sources** [Digitized colonial reports from Mexico](<https://sites.utexas.edu/llilasbensonds/?p=704>) · [Archaeological radiocarbon data](<https://www.p3k14c.org/>)

### 26. By what route did knowledge of gunpowder reach Latin Europe in the thirteenth century? (`gunpowder`)

Chinese texts attest knowledge of gunpowder by the eleventh century. Arabic and Latin references appear in the later thirteenth century, but the route connecting those written traditions remains unclear. Library records, digitized manuscripts and translations preserve names, marginal notes and sometimes a copyist’s date. An author’s purported lifetime can be much earlier than the surviving copy.

**One way to investigate.** Trace distinctive borrowed terms, named authorities and translation errors across dated witnesses. Look for an inventory, letter or ownership note placing a text with a particular intermediary before the Latin reference appeared. Shared terminology can support contact, but direction and timing need independent documentary evidence.

**Sources** [French manuscript catalogues](<https://archivesetmanuscrits.bnf.fr/>) · [Munich digital collections](<https://www.digitale-sammlungen.de/>)

### 27. What do the thousands of unread Shang oracle-bone graphs mean? (`oracle-bones`)

Shang diviners recorded questions and outcomes on bones and turtle shells. Scholars can read many recurring signs, but thousands of distinct forms lack agreed readings. Photographs, ink rubbings and indexed inscriptions are available. A sign may occur only once or only in a personal name, and different hands can write the same word differently.

**One way to investigate.** Group uncertain signs by their appearance and by the words around them. Propose a reading using one group of inscriptions, then check whether it predicts the sense and grammatical position in previously withheld examples. Compare the original images before counting two drawings as separate evidence.

**Sources** [Academia Sinica oracle bones](<https://museum.sinica.edu.tw/collection/32/>) · [Yinqi Wenyuan inscriptions](<https://jgw.aynu.edu.cn/>)

### 28. How did smallpox reach Aboriginal communities around Sydney in 1789? (`sydney-smallpox`)

Smallpox devastated Aboriginal communities around Sydney in 1789, a year after the British colony was founded. Explanations include an introduction associated with the colony and a much longer route through northern Australia. Dutch records document smallpox at Makassar in 1782 and elsewhere in island Southeast Asia that decade. The intervening chain of cases is missing.

**One way to investigate.** Read dated Dutch reports alongside Sydney journals and early accounts from inland communities. Establish where each writer actually observed illness and when news reached the writer. An earlier outbreak overseas establishes a possibility. Connecting it to Sydney would require independent evidence along the proposed route.

**Sources** [Transcribed Dutch company records](<https://globalise.huygens.knaw.nl/>) · [Early Sydney records](<https://www.sl.nsw.gov.au/research-and-collections/significant-collections/journals-first-fleet>)

### 29. Did Europe’s three great medieval cattle plagues come from the east? (`medieval-cattle-plagues`)

Medieval chronicles describe widespread cattle deaths in Europe in 809–810, 937–942 and 1315–1325. Some writers specify cattle, others mention livestock in general, and some describe a severe winter. Digitized Latin, Irish and Arabic texts make it possible to compare reports from different places. Several chronicles can repeat one writer’s account and create the appearance of a much wider event.

**One way to investigate.** For each episode, trace reports back to their earliest witnesses and record the place, date range and animals named. Map the independent observations and check which regions had chroniclers reporting other livestock losses at the time. The first surviving mention can reflect record keeping as well as geography.

**Sources** [Medieval Latin chronicles](<https://www.dmgh.de/>) · [Irish annals](<https://celt.ucc.ie/>)

### 30. Were Mendel's pea-hybrid data too close to expectation, and if so, why? (`mendel`)

Gregor Mendel published counts of pea plants that closely fit the ratios predicted by his account of inheritance. Ronald Fisher later argued that the overall fit was unusually good. The tables survive, but few working records show how ambiguous plants were classified, experiments repeated or results selected for publication. Different practices could produce similar totals.

**One way to investigate.** Reconstruct the sequence of experiments from Mendel’s paper and simulate the results of specific counting or reporting practices documented in contemporary sources. Test whether one explanation accounts for several features of the tables at once. Statistical fit can establish plausibility more readily than it can establish someone’s intent.

**Sources** [Mendel’s published experiments](<http://www.mendelweb.org/MWGerText.html>) · [Mendelianum collections](<https://www.mzm.cz/en/mendelianum/>)

### 31. Was rongorongo an independent invention of writing? (`rongorongo`)

Roughly two dozen surviving objects from Rapa Nui bear signs known as rongorongo. The inscriptions remain undeciphered. Photographs, transcriptions, three-dimensional scans of some tablets and published dates for their wood are available. Whether people carved the signs before European contact matters to the case for an independent invention of writing.

**One way to investigate.** Trace each object to its earliest documented appearance and compare repeated passages across tablets. Ask which clues date the carving itself. An old piece of wood could have been inscribed much later, and a regular sequence of signs alone does not establish that it encoded spoken words.

**Sources** [Smithsonian collections](<https://collections.si.edu/search/results.htm?q=rongorongo>) · [Study of rongorongo sign sequences](<https://doi.org/10.1093/oso/9780198908746.003.0011>)

### 32. How did Gutenberg cast his type? (`gutenberg-type`)

Early printed letters that look identical to the eye show small differences when enlarged. Scholars disagree about whether these variations reveal how Gutenberg made his metal type. High-resolution images of early Mainz printing and several copies of the same Bible pages survive. Ink, paper, pressure and wear can all change the outline left by the same piece of type.

**One way to investigate.** Compare one letter in the same position across several copies of a page to measure variation introduced during printing. Then compare letters from different positions. Look for features that persist across impressions and check which proposed casting methods could produce the remaining differences.

**Sources** [Göttingen Gutenberg Bible](<http://www.gutenbergdigital.de/>) · [Keio University digital copies](<https://dcollections.lib.keio.ac.jp/en/gutenberg>)

### 33. How many people were carried in the Indian Ocean slave trades, 1500–1850? (`indian-ocean-slave-trade`)

Historians have reconstructed parts of the trade in enslaved people across the Indian Ocean, particularly voyages recorded by European companies. Dutch, Cape and some Portuguese and French records survive online. People also travelled in small groups aboard mixed cargo vessels or with local carriers whose records survive unevenly. The size of these gaps matters to any total.

**One way to investigate.** Link departures and arrivals using vessel, captain, date and ports. Distinguish repeated reports of the same passage from a later resale or onward voyage. Calculate documented minimums by route and decade, then test how far independent port records support an estimate for missing traffic.

**Sources** [Dutch East India Company archive](<https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02>) · [French overseas archives](<https://recherche-anom.culture.gouv.fr/>)

### 34. Did Kerala-school infinite series reach early modern Europe through Jesuit missionaries? (`kerala-jesuits`)

Mathematicians in Kerala developed infinite series for quantities such as π before similar results appeared in seventeenth-century Europe. Jesuits worked in the region and corresponded with European mathematicians. A route for contact is plausible, but no known document records the transfer of those series. Access to manuscript correspondence and Indian mathematical texts varies.

**One way to investigate.** Search available letters, teaching notes and inventories for a recognizable worked example, diagram or sequence of terms. Date each witness and trace who could have read it before the European discoveries. Parallel mathematical results and travel between the two regions establish different parts of the case.

**Sources** [Jesuit archival collections](<https://arsi.jesuits.global/>) · [Clavius correspondence](<https://unigre.it/en/historical-archive>)

### 35. Do the missing voices of Renaissance songs survive in lute arrangements? (`renaissance-lute`)

Renaissance printers often sold each voice of a song in a separate book. A tenor book from a 1536 collection survives in Bern, but some companion parts are missing. Lute players arranged songs so that one instrument could play several voices. Digitized partbooks, lute music and contemporary catalogues allow comparisons even when titles have changed.

**One way to investigate.** Search lute arrangements for several distinctive phrases of the surviving tenor in the right order. Compare the full pieces, then check how the same arranger treated songs whose vocal parts all survive. An arrangement can recover a historical way to hear the piece while leaving particular lost notes uncertain.

**Sources** [Bern tenor partbook](<https://www.e-helvetica.nb.admin.ch/directAccess?id=nbdig-839117>) · [RISM music catalogue](<https://rism.online/sources/993114959>)

### 36. Which Atlantic shipments can be linked to Europe’s first potato blight outbreaks? (`potato-blight-ships`)

Potato blight appeared in European fields in the 1840s and helped precipitate the Irish famine. Agricultural letters describe early damaged crops, while shipping notices and customs records list consignments of potatoes. A port of departure says little about where a cargo was grown, and a newspaper’s publication date can postdate the first field damage.

**One way to investigate.** Work backwards from a named grower and a dated report of damage in West Flanders. Look for a purchase, delivery or consignment that can be traced to a particular Atlantic voyage. State where the documents actually connect the shipment to the farm and where the connection remains conjectural.

**Sources** [Agricultural journals](<https://www.biodiversitylibrary.org/bibliography/40100>) · [Dutch shipping notices](<https://www.delpher.nl/>)

### 37. Whose medical knowledge did Hans Sloane collect, and whose names survive in the record? (`sloane-informants`)

Hans Sloane, a London physician, collected remedies and medicinal plants from around the world. His catalogues often name the person who delivered an item and say little about who explained its use. One lead concerns James Pawpaw, a Virginia healer. A printed account credits him with a remedy resembling one in an unsigned Sloane manuscript. Their relationship is still uncertain.

**One way to investigate.** Compare entries in Sloane’s plant catalogue with labels, letters and earlier accounts. Trace named and unnamed contributors across several cases to see whose expertise the catalogue preserved and where names fell out of the record. The Pawpaw manuscript offers one place to test how securely those connections can be made.

**Sources** [Sloane’s plant catalogue](<https://data.nhm.ac.uk/dataset/sloane-vegetable-substances>) · [Sloane Letters Project](<https://sloaneletters.com/>) · [Printed account naming Pawpaw](<https://digirepo.nlm.nih.gov/ext/dw/8111161/PDF/8111161.pdf#page=50>) · [Unsigned Sloane manuscript](<https://nhm.primo.exlibrisgroup.com/discovery/delivery/44NHM_INST:44NHM_V1/12233186820002081#13233193840002081>)

### 38. Do khipus record more than numbers, and can their non-numerical signs be read? (`khipu`)

Andean record keepers tied knots in cords to represent numbers in a decimal system. Colour, the way threads were twisted and the arrangement of pendant cords may also identify people or categories. Public databases record these features, but few khipus can be securely linked to written accounts describing the same community or transaction.

**One way to investigate.** Start with well-documented pairs of cords and accounts. Propose what a repeated colour or construction feature marks, then predict its use in a different record before reading the associated account. Check whether totals or grouping alone explain the pattern. Reading a category would still leave broader claims about narrative open.

**Sources** [Open Khipu Repository](<https://github.com/khipulab/open-khipu-repository>) · [Khipu Field Guide](<https://www.khipufieldguide.com/>)

### 39. Which Hittite tablet fragments belong to the same tablet or preserve the same text? (`hittite-fragments`)

Hittite scribes copied treaties, rituals and other texts onto clay tablets. Many survive in pieces. Searches of the TLHdig sign transcriptions can find plausible continuations, and splitting known texts into artificial fragments has helped test the method. Real pieces are damaged, photographs cover only part of the collection, and two tablets can preserve separate copies of the same passage.

**One way to investigate.** Search distinctive sign sequences, allowing for broken signs. Compare candidates against published editions and photographs. Matching words in order can establish a second copy of a text. A claim that two pieces of clay physically join also needs compatible edges, surfaces and line spacing.

**Sources** [Hittite tablet concordance](<https://hatti.adwudlit.uni-mainz.de/hetkonk/>) · [TLHdig transcriptions](<https://doi.org/10.5281/zenodo.20328284>)

### 40. How many people lived in China around 1600, and how many died between 1620 and 1680? (`china-1600`)

Estimates for China around 1600 differ by tens of millions. Late Ming and early Qing officials counted taxable households and people under changing rules. Local gazetteers sometimes copied earlier figures decades later, even across war and displacement. Digitized local histories, tax returns and some genealogies allow comparisons below the national level.

**One way to investigate.** Follow the same counties through late Ming and early Qing records. Check when officials counted people afresh, what categories they used and whether boundaries changed. Compare the implied losses and recoveries with independently documented settlement and cultivation, then show how much the unobserved counties affect the total.

**Sources** [Harvard-Yenching Library](<https://curiosity.lib.harvard.edu/chinese-rare-books>) · [Library of Congress Chinese collections](<https://www.loc.gov/collections/chinese-rare-books/>)

### 41. When did the thylacine go extinct in the wild? (`thylacine`)

The last known captive thylacine died in Hobart in 1936. Later reports from the Tasmanian bush range from detailed eyewitness accounts to newspaper stories repeated years afterwards. Bounty records, digitized newspapers and a published sightings database let researchers reconstruct some of those reports. The date of the last credible sighting and the date of extinction can differ.

**One way to investigate.** Trace late sightings to the earliest account, merging retellings of the same encounter. Test reliability criteria on older records from years when specimens independently confirm the animal’s presence. Estimate how the extinction range changes when doubtful reports are included and when fewer people were looking.

**Sources** [Tasmanian archival records](<https://libraries.tas.gov.au/>) · [Published sightings database](<https://doi.org/10.7882/az.2023.044>)

### 42. Does the Indus script encode language, or a non-linguistic sign system? (`indus`)

Seals and other objects from the Indus civilization carry strings averaging about five signs. Their order has patterns, but ownership marks and other systems can also have rules without spelling out speech. Photographs and sign-by-sign catalogues survive. There is no generally accepted bilingual inscription that gives the signs a reading.

**One way to investigate.** Test proposed ways to distinguish writing from other sign systems on examples whose function is known. Shorten those examples to the lengths found on Indus objects. Only a test that still distinguishes the known cases would make its verdict on the Indus signs informative.

**Sources** [Asko Parpola on the photographic corpus of Indus seals](<https://tuhat.helsinki.fi/ws/portalfiles/portal/127255979/Parpola_Asko_2018_Indus_Seals_and_Glyptic_Studies_An_Overview_final_proof_2016_.pdf>) · [Interactive Corpus of Indus Texts](<https://www.user.tu-berlin.de/fuls/Homepage/indus/menueindus.htm>)

### 43. How literate was the population of late imperial China? (`qing-literacy`)

Estimates of literacy in Qing China have drawn on schooling, the market for primers and observers’ reports. Surviving contracts provide a different kind of evidence. Some parties signed in their own hand, others made a mark, and sometimes a scribe wrote everyone’s name. Selected collections of these documents can be read online.

**One way to investigate.** Sample contracts across regions and decades. Compare each signature with the scribe’s hand and have a reader check uncertain cases. Report who appeared in the sample, including how often women signed. A rate for landholders who could sign their names measures only one aspect of literacy.

**Sources** [Chinese contract collections](<https://history.sjtu.edu.cn/>) · [Taiwan historical records](<https://archives.ith.sinica.edu.tw/>)

### 44. How much of the cacao along Amazonian rivers grew from colonial-era plantings? (`amazon-cacao`)

Cacao grew in Amazonia long before European colonization. Some groves along rivers today might descend from colonial plantings made for trade. A survey of the Rio Negro in 1774–75 names settlements and records production. Modern forest surveys record where cacao grows. Beans shipped from a village could have been harvested elsewhere.

**One way to investigate.** Separate the survey’s reports of planted trees from quantities of beans shipped. Locate the settlements on old and modern maps, then compare cacao abundance near documented plantings with similar floodplains elsewhere. Earlier Indigenous cultivation and natural differences between riverbanks could produce the same pattern.

**Sources** [Digitized Rio Negro survey](<https://obrasraras.fcp.pa.gov.br/publication/diario-da-viagem-que-em-visita-e-correicao-das-povoacoes-da-capitania-de-s-joze-do-rio-negro-fez-o-ouvidor-e-intendente-geral-da-mesma/>) · [Published forest-plot research](<https://eprints.whiterose.ac.uk/114745/16/aal0157_SupplementalMaterial_v2.pdf>)

### 45. Do old drawings show Jupiter’s Great Red Spot between 1713 and 1831? (`jupiter-red-spot`)

A dark spot on Jupiter was recorded in the seventeenth century. Astronomers disagree about whether it survived to become the modern Great Red Spot. Paris drawings show a dark feature on three nights in 1714. It could be a different weather system. Digitized Paris and Marseille observing books preserve dated drawings and, sometimes, observations of Jupiter’s moons.

**One way to investigate.** Use the moons to check the time and orientation of each drawing. Compare the feature’s latitude and motion across nights and observing seasons. An empty drawing is informative only if the right side of Jupiter faced Earth and the observer drew features small enough to see the spot.

**Sources** [Paris observing records](<https://bibnum.obspm.fr/ark:/11287/2xxtj>) · [Study of the Great Red Spot’s origin](<https://doi.org/10.1029/2024gl108993>)

### 46. How many Indigenous people were enslaved in the Americas between 1492 and 1900? (`indigenous-slavery`)

Estimates of Indigenous enslavement across the Americas rely on regional studies made from very different records. Sales, lawsuits over freedom, mission registers and estate inventories name some individuals. Where enslavement was restricted, documents could describe a captive as a servant or dependent. Digitized collections represent jurisdictions and centuries unevenly.

**One way to investigate.** Link named people and episodes within a region, checking each legal term in context and avoiding counting a resale as another person. Compare the resulting minimum with an independent series such as estate inventories. Show where the sources support an allowance for missing cases before combining regional ranges.

**Sources** [Spanish imperial records](<https://pares.cultura.gob.es/inicio.html>) · [São Paulo public archives](<https://www.arquivoestado.sp.gov.br/>)

### 47. When did Europeans first describe the outbreak later called syphilis? (`early-syphilis`)

A severe outbreak Europeans called the French disease was widely recognized in the 1490s. Alleged earlier cases matter to the chronology on either side of Columbus’s return in 1493. Digital collections include medical tracts and contemporary chronicles. A writer recalling an earlier patient decades later could use a name learned only after the epidemic.

**One way to investigate.** Gather the earliest independent accounts and record separately when the illness occurred, when someone described it and when the surviving copy was made. Compare symptoms and the words contemporaries used with municipal orders from the same place. Distinguish the first recognizable description from a claim about the disease’s ultimate origin.

**Sources** [Catalogue of early European books](<https://data.cerl.org/istc/>) · [Wellcome Collection](<https://wellcomecollection.org/works/ehw8tv72>)

### 48. Did the age groups most at risk of dying change between waves of the “Russian flu”? (`russian-flu`)

The pandemic that began in 1889 returned in several waves. London medical reports and Danish burial records include ages at death, but the cities had different populations and used different age groups. A larger number of older people among the dead could reflect the city’s age structure or the season in which a wave arrived.

**One way to investigate.** Date the waves locally, match the age groups in death returns to those in the census, and calculate deaths above the usual seasonal level per resident. Compare successive waves within each city before checking whether the same shift in age-specific risk appears elsewhere.

**Sources** [Digitized London health reports](<https://wellcomelibrary.org/moh/report/b18252503/85>) · [Danish mortality research](<https://github.com/PandemiXcenter/SignatureFeatures19thCentury>)

### 49. Did the population of Ottoman Anatolia collapse in the late sixteenth and seventeenth centuries? (`ottoman-tahrir`)

Sixteenth-century Ottoman tax surveys suggest a growing population in Anatolia, followed by a marked decline in some records. Many early registers counted taxable household heads. Later registers could group several households into a single tax unit. Published registers and historical place-name lists make it possible to follow some villages across the change.

**One way to investigate.** Match settlements across successive registers, checking variant names and boundary changes. Where another local record counts actual households, use it to estimate how many lay behind one tax unit. Test whether the apparent fall persists within the same places under plausible conversions and after allowing for migration.

**Sources** [Published Ottoman registers](<https://www.devletarsivleri.gov.tr/>) · [Ottoman place-name gazetteer](<https://doi.org/10.5281/zenodo.7351936>)

### 50. Did Ptolemy observe the Almagest star catalogue or adapt Hipparchus's? (`ptolemy`)

Ptolemy listed positions for about a thousand stars in the second century CE. A systematic error in their longitudes has led scholars to ask whether he updated measurements made by Hipparchus some three centuries earlier. Only fragments of the earlier astronomer’s work survive. Modern catalogues let researchers calculate where stars appeared at either date.

**One way to investigate.** Compare the surviving ancient coordinates, then test competing explanations on the rest of the catalogue. Which errors would an observer in Ptolemy’s time make, and which would follow from shifting older measurements by a fixed amount? Allow for rounding and mistakes in later manuscript copies.

**Sources** [Historical star catalogues](<https://ptolemaeus.badw.de/>) · [Hipparcos and Tycho star positions](<https://www.cosmos.esa.int/web/hipparcos/catalogues>)

### 51. Where was Yamatai, the realm of Queen Himiko? (`yamatai`)

A third-century Chinese account describes a journey to Queen Himiko’s realm in Japan. Following its directions and travel times literally takes a traveller offshore. Scholars have proposed centres in Kyushu and around Nara. Digitized excavation reports record settlements, tombs and imported objects from the period, but each candidate region has conspicuous finds.

**One way to investigate.** Map the routes permitted by different readings of the itinerary, recording every change of direction or unit assumed. Then test where each route predicts both a political centre and neighbouring settlements against independently dated excavations. A single impressive tomb could fit several accounts.

**Sources** [Chinese itinerary](<https://ctext.org/sanguozhi>) · [Japanese excavation reports](<https://sitereports.nabunken.go.jp/>)

### 52. What did Nahua writers say about the people Spaniards described as having leprosy? (`leprosy-americas`)

In sixteenth-century Mexico, a friar used the Spanish word for leprosy in a festival description. Nahua writers described people whom dancers portrayed. The Digital Florentine Codex puts Nahuatl and Spanish accounts side by side, and early dictionaries record words for bodily conditions. A dictionary gloss, a ritual performance and an account of a sick person each answer different questions.

**One way to investigate.** Trace the Nahuatl terms and their spelling variants into independent accounts. Read who is speaking, whose body is described and how others responded. Compare the original wording with the Spanish translation before drawing conclusions about a shared diagnosis or people’s experience of illness.

**Sources** [Digital Florentine Codex](<https://florentinecodex.getty.edu/en/book/2/folio/108v>) · [Online Nahuatl Dictionary](<https://nahuatl.wired-humanities.org/content/teococoxqui>)

### 53. Did Cassini see the star that exploded in Cassiopeia in the 1670s? (`cassini-cas-a`)

The star whose remains are called Cassiopeia A exploded roughly three and a half centuries ago. A French report in June 1671 says the astronomer Cassini had seen stars missing from earlier counts of that constellation. His 1669 notebook survives, but his regular Paris journal starts after the report. Later entries mention Cassiopeia without identifying an explosion.

**One way to investigate.** Read the notebook and journals for dated sketches, measurements or named neighbouring stars. Reconstruct the sky for each date and check Cassini’s accuracy on stars we can identify. A description must distinguish the remnant’s position from other stars in the same constellation.

**Sources** [Cassini’s earlier notebook](<https://bibnum.obspm.fr/ark:/11287/6DjRX>) · [Cassini’s 1671 observing journal](<https://bibnum.obspm.fr/ark:/11287/14CzG>)

### 54. Does Proto-Elamite record language, and is it the ancestor of Linear Elamite? (`proto-elamite`)

Early Iranian accounting tablets preserve Proto-Elamite signs for numbers alongside signs whose meaning is less certain. Photographs and transcriptions record roughly 1,600–1,700 tablets. A sign beside a number could identify a commodity without spelling a word. Resemblances to the much later Linear Elamite script have also been proposed, across a long gap in the record.

**One way to investigate.** Group signs by where they occur in accounts and test that procedure on an early accounting system whose signs are better understood. Separately compare proposed correspondences across the two Iranian scripts. A claim of descent needs recurring matches in function and form beyond what chance resemblance would predict.

**Sources** [Cuneiform Digital Library Initiative](<https://cdli.earth/search?simple-value%5B0%5D=%2A&simple-field%5B0%5D=keyword&f%5Bperiod%5D%5B0%5D=Proto-Elamite+%28ca.+3100-2900+BC%29&limit=100>) · [Study of Proto-Elamite](<https://doi.org/10.1017/9781009614559>)

### 55. Were Moses Shapira's Deuteronomy fragments an ancient text or an 1880s forgery? (`shapira-scrolls`)

In 1883 Moses Shapira offered leather strips bearing a version of Deuteronomy for sale. Scholars pronounced them forgeries, and the strips subsequently disappeared. Surviving drawings, transcriptions, newspaper reproductions and Shapira’s papers have supported arguments on both sides. Without the originals, even the shape of a disputed letter can depend on who copied it.

**One way to investigate.** Compare independent witnesses line by line. For readings they agree on, check which spellings and letter forms were known to a possible forger in 1883 and which appeared in securely ancient finds only later. Flag conclusions that disappear when a different contemporary transcription is used.

**Sources** [British Library Shapira papers](<https://searcharchives.bl.uk/>) · [Berlin manuscript collection](<https://stabikat.de/>)

### 56. Which volcano produced the sulfate deposit dated to around 1809? (`eruption-1809`)

Sulfate in polar ice and eyewitness reports of a high haze point to a major eruption around 1809. The volcano remains unidentified. An 1836 account places an eruption of Lamongan in Java in December 1808, while the Latin work it cites describes November 1818. One copied date could create a false lead.

**One way to investigate.** Trace both dates back to their earliest witnesses and search surviving Dutch colonial correspondence for an independent, locally dated report of ash or darkness. Compare its timing with the haze observations. Identifying an eruption in Java would still leave the question of whether it produced the polar deposit.

**Sources** [Dutch colonial records](<https://www.nationaalarchief.nl/onderzoeken/archief>) · [Ice-core and climate study](<https://doi.org/10.5194/cp-17-1455-2021>)

### 57. How common was sleeping in two shifts before industrialization? (`segmented-sleep`)

References to a “first sleep” helped establish the idea that people once routinely woke in the middle of the night before sleeping again. Digitized books, diaries and court testimony contain descriptions of nights, but a phrase can be figurative, translated or copied through many editions. A person awakened by a burglary tells us little about an ordinary night.

**One way to investigate.** Search for both interrupted and continuous nights, including descriptions that never use the phrase “first sleep.” Have readers classify independent accounts and distinguish exceptional events from repeated habits. Compare periods, occupations and kinds of writing before estimating how common the practice was.

**Sources** [Digitized early English books](<https://textcreationpartnership.org/>) · [Old Bailey testimony](<https://www.oldbaileyonline.org/>)

### 58. When was Beowulf composed? (`beowulf`)

Beowulf survives in one medieval manuscript copied around the year 1000. Its composition could have been much earlier. Verse rhythms, vocabulary and spellings have all been used to date it, but a scribe can modernize some features and preserve others. Manuscript images, early transcriptions and collections of other Old English poems are available for comparison.

**One way to investigate.** Test proposed signs of early composition on independently dated texts, particularly works that survive in later copies. Then examine whether the same signs agree across different parts of Beowulf. A method that mainly sorts texts by genre or by the date of the surviving copy cannot securely date the poem.

**Sources** [Electronic Beowulf](<https://ebeowulf.uky.edu/>) · [Old English Poetry in Facsimile](<https://oepoetryfacsimile.org/>)

### 59. How much American silver reached China between 1550 and 1800? (`silver-china`)

Silver mined in the Americas reached China across the Pacific via Manila and by routes through Europe and Asia. Mint and treasury accounts record production and some shipments. Chinese markets also received Japanese silver, and merchants evaded customs. Adding up recorded arrivals can count the same metal several times as it changed ports.

**One way to investigate.** Reconstruct flows one route and decade at a time, pairing departures with receipts and converting local units into silver weight. Check whether the quantities attributed to China are compatible with production and recorded sales elsewhere. Show how estimates change under different allowances for unregistered trade.

**Sources** [Spanish imperial records](<https://pares.cultura.gob.es/inicio.html>) · [Dutch company archives](<https://www.nationaalarchief.nl/>)

### 60. Which cultivated toromiro trees descend from wild Rapa Nui collections? (`toromiro-provenance`)

Toromiro, a tree from Rapa Nui, survives in cultivation after disappearing from the wild. Some Melbourne trees might preserve a distinct introduction. A pressed specimen records a particular garden bed, while published studies describe relationships among living trees. The name on a specimen does not by itself tell us who supplied the seed.

**One way to investigate.** Follow the specimen number and bed reference into garden inventories, donor lists and records of transfers from Gothenburg. Check dates against earlier herbarium sheets. An unbroken chain of entries could establish an introduction, while an undated or misidentified specimen would leave a gap even if the trees look alike.

**Sources** [Allan Herbarium](<https://scd.landcareresearch.co.nz/Specimen/CHR_524208>) · [Royal Botanic Gardens Victoria](<https://data.rbg.vic.gov.au/rbgcensus/>)

### 61. What texts did Newton copy in the alchemical manuscripts whose sources are unidentified? (`newton-alchemy-sources`)

Newton copied and commented on other writers’ alchemical work. Digital editions identify many of his sources and reproduce his manuscripts, but several passages remain unattributed. Authors borrowed from one another, and some works circulated under different titles or only in handwritten copies. Identifying a source would show what Newton had actually read.

**One way to investigate.** Start with a passage whose source editors have identified and test whether a search recovers it. Then search digitized texts for unusual sequences of words in the unattributed passages. Check candidate editions against Newton’s omissions, wording and copying errors, allowing for a translation or an intermediate manuscript.

**Sources** [Chymistry of Isaac Newton](<https://newton.dlib.indiana.edu/>) · [Newton Project](<https://www.newtonproject.ox.ac.uk/>)

### 62. Where was Agade, the capital of the Sargonic empire? (`agade`)

Agade was the capital of Sargon’s empire in what is now Iraq. Ancient writers knew how to get there, but the rivers have changed course, and an inscription naming the city has yet to identify its site. Digitized tablets mention nearby towns, river crossings and stages of travel. Historical satellite photographs show abandoned channels.

**One way to investigate.** Map the routes described in texts of known date against river courses plausible for that period. See which candidate places satisfy journeys from several directions, including ones omitted when drawing the initial map. This could narrow the search even if identifying a particular mound ultimately requires excavation.

**Sources** [Cuneiform Digital Library Initiative](<https://cdli.earth/>) · [Historical satellite imagery](<https://corona.cast.uark.edu/>)

### 63. How did a dodo become the subject of a Mughal painting? (`mughal-dodo`)

A Mughal album contains a painting of a bird recognizable as a dodo, a species native to Mauritius. A Dutch ship’s journal records dodos taken there in 1615. The traveller Peter Mundy later recalled seeing two alive at Surat in India. These accounts establish parts of a possible journey, but neither identifies the bird seen by the painter.

**One way to investigate.** Follow the named ship through its journal, cargo records and letters. Look for a dated landing, sale or gift that places a live bird with someone connected to the Mughal court. Check the dating of the painting separately from that of the album assembled around it.

**Sources** [Dutch East India Company records](<https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/1059/file/NL-HaNA_1.04.02_1059_0277>) · [Mughal album collection](<https://www.orientalstudies.ru/eng/images/pdf/st.petersburg_muraqqa_1996.pdf>)

### 64. Which lost silent films survive in fragments whose titles are unknown? (`silent-film-fragments`)

Archives hold fragments of silent films whose identifying titles have disappeared. Eye Filmmuseum makes some available to watch. Trade papers, copyright descriptions and publicity stills can identify a scene. A recent search matched one shipwreck sequence to The Adorable Savage, only to find that Eye had already identified it under another catalogue description.

**One way to investigate.** Record the sequence of actions, surviving words and unusual props before searching for a title. Use one detail to find candidates and another to test them against original footage. Check both the archive’s attribution history and surviving-print records before claiming a lost film has resurfaced.

**Sources** [Eye Filmmuseum](<https://www.eyefilm.nl/en/collection/collections/film/bits-pieces>) · [Digitized film trade press](<https://lantern.mediahist.org/>)

### 65. Which earthquake sent waves up the Padang River in 1697? (`padang-1697`)

A Dutch dispatch describes an earthquake in 1697 and repeated surges up the river at Padang on Sumatra’s west coast. It gives several places but no dependable wave heights. Published coral records constrain possible offshore earthquakes without selecting a unique source. The dispatch mentions a damage survey that could preserve observations closer to the event.

**One way to investigate.** Trace the enclosure and compare independently written coastal reports, including English correspondence from nearby settlements. Reconstruct which sites experienced waves and when. Test candidate earthquake models against those observations and the coral evidence, keeping uncertain place names and secondhand timings visible.

**Sources** [Dutch company dispatches](<https://transcriptions.globalise.huygens.knaw.nl/detail/urn:globalise:NL-HaNA_1.04.02_1596_0344>) · [East India Company correspondence](<https://searcharchives.bl.uk/catalog/040-000177012>)

### 66. What caused the cocoliztli epidemics of 1545 and 1576 in New Spain? (`cocoliztli`)

Nahua and Spanish witnesses described devastating epidemics in New Spain in 1545 and 1576. The Nahuatl term cocoliztli could describe a severe pestilence with more than one cause. Published studies of epidemic burials in Oaxaca have identified evidence of enteric fever in some individuals. That finding leaves open the causes of deaths elsewhere and in the later outbreak.

**One way to investigate.** Separate the two epidemics and map the places, seasons and symptoms that independent witnesses report. Compare each account with the dates and locations covered by published burial studies. Distinguish a diagnosis supported at one site from an explanation that fits the wider pattern of deaths.

**Sources** [Colonial Mexican reports](<https://collections.lib.utexas.edu/?f%5Bmods_relatedItem_titleInfo_title_source_t%5D%5B%5D=Relaciones+Geogr%C3%A1ficas+of+Mexico+and+Guatemala>) · [Florentine Codex collection](<https://florentinecodex.getty.edu/>)

### 67. Why did plague disappear from western Europe after the early eighteenth century? (`plague-disappearance`)

After centuries of recurrent plague, western European cities experienced their last major epidemics at different times. Outbreaks continued around the Mediterranean after London’s last great epidemic in 1665, including in Provence in 1720. Port health registers, dated outbreak lists and quarantine correspondence survive unevenly. A city could escape because precautions worked or because its exposure changed.

**One way to investigate.** Pair ports with comparable trading connections and trace exposure over time using surviving arrival and health records. Compare the timing of epidemic decline with changes in trade, public health and local conditions. Include years when officials recorded threats but no local epidemic, and distinguish missing registers from quiet years.

**Sources** [Provençal archives](<https://www.archives13.fr/>) · [Venetian state archives](<https://www.archiviodistatovenezia.it/>)

### 68. Which old books preserve overlooked word lists from little-documented languages? (`hidden-vocabularies`)

Early travellers sometimes printed vocabulary lists in books with no mention of language in the title. For a language documented only rarely, one such page could preserve otherwise unknown words. A pilot catalogue covers 42 languages. It also shows how one traveller’s printed list could reappear decades later under another author’s name.

**One way to investigate.** Test a search on known lists in digitized travel books, then apply it to a defined collection of natural histories or voyage accounts. Check each discovery against the page image and earlier bibliographies. Shared errors, word order and translations can reveal which lists derive from the same encounter.

**Sources** [Text Creation Partnership](<https://textcreationpartnership.org/>) · [Wordes of their Language catalogue](<https://github.com/benjaminbreen/WordsoftheirLanguage>)

### 69. Which lost works of Galen survive unrecognised in Arabic and Syriac? (`galen-arabic`)

Some works by the ancient physician Galen disappeared in Greek after translators had rendered them into Syriac or Arabic. Medieval scholars described their translations, and later authors sometimes quoted them. Digital manuscript images, searchable Arabic texts and a Greek–Arabic lexicon provide clues. A catalogue title can also conceal an abridgement or a different author.

**One way to investigate.** Search quotations for unusual phrases characteristic of a known translator and compare the surrounding argument with ancient descriptions of the lost work. Check the manuscript image and seek a second witness to the passage. A familiar medical opinion alone gives weak grounds for attributing it to Galen.

**Sources** [Greek–Arabic lexicon](<https://telota.bbaw.de/glossga/>) · [Syriac Galen manuscript project](<https://figshare.manchester.ac.uk/articles/dataset/Syriac_Galen_Palimpsest_Processed_Images/28554083>)

### 70. How, if at all, did Copernicus learn of the Maragha-school planetary models? (`copernicus-maragha`)

Copernicus used mathematical devices resembling those developed by astronomers at Maragha and elsewhere in the Islamic world. Surviving diagrams establish the resemblance. What remains unclear is how a particular idea might have reached him. Digitized Arabic, Greek and European manuscripts, library inventories and books he annotated preserve parts of the possible chain.

**One way to investigate.** Compare distinctive diagram labels and unusual errors across copies. For a promising match, trace the manuscript’s owners and dates against the movements of Copernicus and his teachers. A copy known to be in the right library at the right time is stronger evidence than two astronomers drawing the same geometry.

**Sources** [Vatican manuscript collections](<https://digi.vatlib.it/view/MSS_Vat.gr.211>) · [Uppsala University Library](<https://www.uu.se/en/news/2017/2017-04-06-nicolaus-copernicus-books-digitized>)

### 71. Are Borneo’s wild elephants native, or descendants of a royal gift? (`borneo-elephants`)

One account traces Borneo’s elephants to a gift of animals taken from Java through the Sulu islands. Another holds that an elephant population had long lived on Borneo. Dutch company records mention elephants at Javanese courts, including imports. Published genetic studies can estimate when populations diverged, but that date need not be when animals reached an island.

**One way to investigate.** Search diplomatic letters and shipping records for a gift whose animals can be followed from departure through arrival. Check against independent records in Sulu or Borneo and evidence of elephants there before the proposed transfer. A court owning elephants says little by itself about where they were born.

**Sources** [Searchable Dutch company records](<https://globalise.huygens.knaw.nl/>) · [Published elephant genetics](<https://doi.org/10.1002/ece3.72019>)
