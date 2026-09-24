// Vocabulary Category Data - Organized by theme/subcategory

export interface VocabWord {
  word: string;
  phonetic: string;
  pos: string; // part of speech
  definition: string;
  example: string;
  synonyms: string[];
  uk?: string;
  us?: string;
}

export interface VocabSubcategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  level: string;
  wordCount: number;
  parentCategory: 'jobs' | 'scenarios' | 'people' | 'daily' | 'academic';
  words: VocabWord[];
}

export const vocabSubcategories: VocabSubcategory[] = [
  // ===== JOBS & PROFESSIONS =====
  {
    id: 'medical-healthcare',
    title: 'Medical & Healthcare',
    icon: '🏥',
    description: 'Essential vocabulary for doctors, nurses, and healthcare settings.',
    level: 'B2',
    wordCount: 12,
    parentCategory: 'jobs',
    words: [
      { word: 'diagnosis', phonetic: '/ˌdaɪ.əɡˈnoʊ.sɪs/', pos: 'noun', definition: 'The identification of a disease or condition.', example: 'The doctor made a quick diagnosis after examining the patient.', synonyms: ['identification', 'detection', 'finding'] },
      { word: 'prescription', phonetic: '/prɪˈskrɪp.ʃən/', pos: 'noun', definition: 'A written order for medicine from a doctor.', example: 'The pharmacist filled my prescription for antibiotics.', synonyms: ['medication order', 'recipe'] },
      { word: 'symptom', phonetic: '/ˈsɪmp.təm/', pos: 'noun', definition: 'A physical sign of disease or illness.', example: 'Common symptoms of the flu include fever and body aches.', synonyms: ['sign', 'indication', 'manifestation'] },
      { word: 'chronic', phonetic: '/ˈkrɒn.ɪk/', pos: 'adjective', definition: 'Persisting for a long time or constantly recurring.', example: 'She has been dealing with chronic back pain for years.', synonyms: ['persistent', 'long-term', 'ongoing'] },
      { word: 'referral', phonetic: '/rɪˈfɜː.rəl/', pos: 'noun', definition: 'The act of directing someone to another professional.', example: 'My GP gave me a referral to see a specialist.', synonyms: ['recommendation', 'direction', 'introduction'] },
      { word: 'prognosis', phonetic: '/prɒɡˈnoʊ.sɪs/', pos: 'noun', definition: 'The likely course and outcome of a disease.', example: 'The prognosis for full recovery is very positive.', synonyms: ['outlook', 'forecast', 'prediction'] },
      { word: 'ward', phonetic: '/wɔːrd/', pos: 'noun', definition: 'A separate room or area in a hospital for patients.', example: 'She was moved to the surgical ward after her operation.', synonyms: ['unit', 'department', 'ward'] },
      { word: 'outpatient', phonetic: '/ˈaʊt.peɪ.ʃənt/', pos: 'noun', definition: 'A patient who receives treatment without staying overnight.', example: 'The procedure is done on an outpatient basis.', synonyms: ['day patient', 'non-resident patient'] },
      { word: 'triage', phonetic: '/ˈtri.ɑːʒ/', pos: 'noun', definition: 'The process of sorting patients by urgency of treatment.', example: 'The nurse performed triage to prioritize the most critical cases.', synonyms: ['sorting', 'prioritization', 'classification'] },
      { word: 'dosage', phonetic: '/ˈdoʊ.sɪdʒ/', pos: 'noun', definition: 'The size or frequency of a dose of medicine.', example: 'The doctor adjusted the dosage based on the patient\'s weight.', synonyms: ['dose', 'amount', 'quantity'] },
      { word: 'sterile', phonetic: '/ˈster.aɪl/', pos: 'adjective', definition: 'Free from bacteria or other living microorganisms.', example: 'All surgical instruments must be completely sterile.', synonyms: ['sanitized', 'disinfected', 'clean'] },
      { word: 'malpractice', phonetic: '/ˈmæl.præk.tɪs/', pos: 'noun', definition: 'Improper or unethical professional conduct.', example: 'The hospital was sued for medical malpractice.', synonyms: ['negligence', 'misconduct', 'professional error'] },
    ],
  },
  {
    id: 'tech-it',
    title: 'Technology & IT',
    icon: '💻',
    description: 'Vocabulary for software, hardware, and the tech industry.',
    level: 'B1',
    wordCount: 12,
    parentCategory: 'jobs',
    words: [
      { word: 'deploy', phonetic: '/dɪˈplɔɪ/', pos: 'verb', definition: 'To put software or systems into use.', example: 'We plan to deploy the new update next Monday.', synonyms: ['launch', 'release', 'implement'] },
      { word: 'bandwidth', phonetic: '/ˈbænd.wɪdθ/', pos: 'noun', definition: 'The maximum data transfer rate of a network.', example: 'Streaming video requires a lot of bandwidth.', synonyms: ['capacity', 'throughput', 'data rate'] },
      { word: 'algorithm', phonetic: '/ˈæl.ɡə.rɪð.əm/', pos: 'noun', definition: 'A set of rules or steps for solving a problem.', example: 'The search algorithm ranks results by relevance.', synonyms: ['procedure', 'formula', 'method'] },
      { word: 'debug', phonetic: '/diːˈbʌɡ/', pos: 'verb', definition: 'To find and fix errors in computer code.', example: 'I spent three hours debugging the application.', synonyms: ['troubleshoot', 'fix', 'resolve'] },
      { word: 'scalable', phonetic: '/ˈskeɪ.lə.bəl/', pos: 'adjective', definition: 'Able to grow or handle increased demand.', example: 'We need a scalable solution for our growing user base.', synonyms: ['expandable', 'flexible', 'adaptable'] },
      { word: 'interface', phonetic: '/ˈɪn.tə.feɪs/', pos: 'noun', definition: 'A point where two systems or users interact.', example: 'The user interface should be simple and intuitive.', synonyms: ['UI', 'dashboard', 'screen'] },
      { word: 'encryption', phonetic: '/ɪnˈkrɪp.ʃən/', pos: 'noun', definition: 'The process of converting data into a coded format.', example: 'End-to-end encryption keeps your messages private.', synonyms: ['encoding', 'scrambling', 'ciphering'] },
      { word: 'latency', phonetic: '/ˈleɪ.tən.si/', pos: 'noun', definition: 'The delay before data transfer begins.', example: 'High latency can make video calls frustrating.', synonyms: ['delay', 'lag', 'response time'] },
      { word: 'iterate', phonetic: '/ˈɪt.ə.reɪt/', pos: 'verb', definition: 'To repeat a process to improve something.', example: 'We iterate on the design based on user feedback.', synonyms: ['refine', 'repeat', 'revise'] },
      { word: 'repository', phonetic: '/rɪˈpɒz.ɪ.tɔː.ri/', pos: 'noun', definition: 'A central location where data or code is stored.', example: 'All our code is kept in a shared repository.', synonyms: ['storage', 'archive', 'database'] },
      { word: 'firewall', phonetic: '/ˈfaɪə.wɔːl/', pos: 'noun', definition: 'A security system that monitors network traffic.', example: 'The firewall blocked the suspicious connection attempt.', synonyms: ['security barrier', 'network guard'] },
      { word: 'agile', phonetic: '/ˈædʒ.aɪl/', pos: 'adjective', definition: 'A flexible approach to project management.', example: 'Our team uses agile methodology for software development.', synonyms: ['flexible', 'adaptive', 'iterative'] },
    ],
  },
  {
    id: 'business-finance',
    title: 'Business & Finance',
    icon: '💼',
    description: 'Professional vocabulary for corporate and financial environments.',
    level: 'B2',
    wordCount: 12,
    parentCategory: 'jobs',
    words: [
      { word: 'revenue', phonetic: '/ˈrev.ən.juː/', pos: 'noun', definition: 'Income generated from business activities.', example: 'The company\'s annual revenue exceeded $10 million.', synonyms: ['income', 'earnings', 'turnover'] },
      { word: 'stakeholder', phonetic: '/ˈsteɪkˌhoʊl.dər/', pos: 'noun', definition: 'A person with an interest in a business.', example: 'We need to present the results to all stakeholders.', synonyms: ['investor', 'shareholder', 'partner'] },
      { word: 'leverage', phonetic: '/ˈlev.ər.ɪdʒ/', pos: 'verb', definition: 'To use something to maximum advantage.', example: 'We can leverage our existing customer base for growth.', synonyms: ['utilize', 'exploit', 'capitalize on'] },
      { word: 'benchmark', phonetic: '/ˈbentʃ.mɑːk/', pos: 'noun', definition: 'A standard used for comparison.', example: 'This report sets a new benchmark for the industry.', synonyms: ['standard', 'reference point', 'measure'] },
      { word: 'dividend', phonetic: '/ˈdɪv.ɪ.dend/', pos: 'noun', definition: 'A payment made to shareholders from profits.', example: 'Shareholders received a dividend of $2 per share.', synonyms: ['payout', 'return', 'distribution'] },
      { word: 'liability', phonetic: '/ˌlaɪ.əˈbɪl.ɪ.ti/', pos: 'noun', definition: 'A financial obligation or debt.', example: 'The company\'s liabilities exceed its assets.', synonyms: ['debt', 'obligation', 'responsibility'] },
      { word: 'merger', phonetic: '/ˈmɜː.dʒər/', pos: 'noun', definition: 'The combining of two companies into one.', example: 'The merger created the largest bank in the country.', synonyms: ['combination', 'union', 'acquisition'] },
      { word: 'audit', phonetic: '/ˈɔː.dɪt/', pos: 'noun', definition: 'An official inspection of financial accounts.', example: 'The annual audit revealed no irregularities.', synonyms: ['inspection', 'review', 'examination'] },
      { word: 'procurement', phonetic: '/prəˈkjʊə.mənt/', pos: 'noun', definition: 'The process of obtaining goods or services.', example: 'Our procurement team negotiated a better deal with suppliers.', synonyms: ['purchasing', 'acquisition', 'sourcing'] },
      { word: 'quarterly', phonetic: '/ˈkwɔː.tə.li/', pos: 'adjective', definition: 'Occurring every three months.', example: 'The quarterly report showed a 15% increase in sales.', synonyms: ['three-monthly', 'periodic'] },
      { word: 'portfolio', phonetic: '/pɔːtˈfoʊ.li.oʊ/', pos: 'noun', definition: 'A range of investments held by a person or organization.', example: 'She diversified her portfolio across different sectors.', synonyms: ['holdings', 'investments', 'assets'] },
      { word: 'compliance', phonetic: '/kəmˈplaɪ.əns/', pos: 'noun', definition: 'The act of following rules and regulations.', example: 'The company ensures full compliance with data protection laws.', synonyms: ['conformity', 'adherence', 'observance'] },
    ],
  },
  {
    id: 'hospitality-tourism',
    title: 'Hospitality & Tourism',
    icon: '🏨',
    description: 'Vocabulary for hotels, restaurants, travel, and tourism.',
    level: 'B1',
    wordCount: 12,
    parentCategory: 'jobs',
    words: [
      { word: 'itinerary', phonetic: '/aɪˈtɪn.ər.er.i/', pos: 'noun', definition: 'A planned route or journey.', example: 'Our itinerary includes visits to three cities in five days.', synonyms: ['schedule', 'route', 'plan'] },
      { word: 'amenity', phonetic: '/əˈmiː.nɪ.ti/', pos: 'noun', definition: 'A desirable or useful feature of a place.', example: 'The hotel offers amenities like a pool, gym, and spa.', synonyms: ['facility', 'feature', 'perk'] },
      { word: 'concierge', phonetic: '/kɒn.siˈeəʒ/', pos: 'noun', definition: 'A hotel staff member who assists guests.', example: 'The concierge arranged a taxi and restaurant reservation.', synonyms: ['attendant', 'porter', 'assistant'] },
      { word: 'reservation', phonetic: '/ˌrez.əˈveɪ.ʃən/', pos: 'noun', definition: 'An arrangement to secure something in advance.', example: 'I\'d like to make a reservation for two at 7 PM.', synonyms: ['booking', 'appointment', 'arrangement'] },
      { word: 'complimentary', phonetic: '/ˌkɒm.plɪˈmen.tər.i/', pos: 'adjective', definition: 'Given free as a courtesy.', example: 'The hotel provides complimentary breakfast for all guests.', synonyms: ['free', 'gratis', 'courtesy'] },
      { word: 'excursion', phonetic: '/ɪkˈskɜː.ʃən/', pos: 'noun', definition: 'A short journey or trip, especially for leisure.', example: 'We booked an excursion to the nearby island.', synonyms: ['trip', 'outing', 'tour'] },
      { word: 'vacancy', phonetic: '/ˈveɪ.kən.si/', pos: 'noun', definition: 'An unoccupied room or position.', example: 'Do you have any vacancies for this weekend?', synonyms: ['availability', 'opening', 'space'] },
      { word: 'surcharge', phonetic: '/ˈsɜː.tʃɑːdʒ/', pos: 'noun', definition: 'An additional charge added to the basic price.', example: 'There\'s a 10% surcharge for service during holidays.', synonyms: ['extra charge', 'fee', 'additional cost'] },
      { word: 'check-in', phonetic: '/ˈtʃek.ɪn/', pos: 'noun', definition: 'The process of registering at a hotel or airport.', example: 'Check-in time is at 3 PM.', synonyms: ['registration', 'arrival', 'sign-in'] },
      { word: 'layover', phonetic: '/ˈleɪˌoʊ.vər/', pos: 'noun', definition: 'A period of waiting between connecting flights.', example: 'We had a three-hour layover in Dubai.', synonyms: ['stopover', 'connection', 'transit'] },
      { word: 'housekeeping', phonetic: '/ˈhaʊsˌkiː.pɪŋ/', pos: 'noun', definition: 'The department that cleans and maintains hotel rooms.', example: 'Please call housekeeping if you need extra towels.', synonyms: ['cleaning service', 'room service'] },
      { word: 'all-inclusive', phonetic: '/ˌɔːl.ɪnˈkluː.sɪv/', pos: 'adjective', definition: 'Including everything in one price.', example: 'We booked an all-inclusive resort for our vacation.', synonyms: ['comprehensive', 'complete', 'full-service'] },
    ],
  },

  // ===== SCENARIOS =====
  {
    id: 'travel-airport',
    title: 'Travel & Airport',
    icon: '✈️',
    description: 'Essential phrases and vocabulary for airports and flying.',
    level: 'B1',
    wordCount: 12,
    parentCategory: 'scenarios',
    words: [
      { word: 'boarding pass', phonetic: '/ˈbɔː.dɪŋ pɑːs/', pos: 'noun', definition: 'A card that allows you to board an airplane.', example: 'Please have your boarding pass ready at the gate.', synonyms: ['flight ticket', 'boarding card'] },
      { word: 'customs', phonetic: '/ˈkʌs.təmz/', pos: 'noun', definition: 'The place where luggage is checked at a border.', example: 'We had to declare our purchases at customs.', synonyms: ['border control', 'checkpoint'] },
      { word: 'terminal', phonetic: '/ˈtɜː.mɪ.nəl/', pos: 'noun', definition: 'A building at an airport for passengers.', example: 'Our flight departs from Terminal 2.', synonyms: ['concourse', 'building'] },
      { word: 'delayed', phonetic: '/dɪˈleɪd/', pos: 'adjective', definition: 'Made to happen later than planned.', example: 'Our flight was delayed by two hours due to weather.', synonyms: ['postponed', 'held up', 'late'] },
      { word: 'connecting flight', phonetic: '/kəˈnek.tɪŋ flaɪt/', pos: 'noun', definition: 'A flight you take after arriving from another.', example: 'I have a connecting flight in Frankfurt.', synonyms: ['transfer flight', 'transit'] },
      { word: 'carry-on', phonetic: '/ˈkær.i.ɒn/', pos: 'noun', definition: 'Luggage you take into the airplane cabin.', example: 'Each passenger is allowed one carry-on bag.', synonyms: ['hand luggage', 'cabin bag'] },
      { word: 'gate', phonetic: '/ɡeɪt/', pos: 'noun', definition: 'The area where passengers board a plane.', example: 'Boarding for flight BA123 begins at Gate 14.', synonyms: ['departure gate', 'boarding area'] },
      { word: 'turbulence', phonetic: '/ˈtɜː.bjʊ.ləns/', pos: 'noun', definition: 'Rough, unstable air during a flight.', example: 'Please fasten your seatbelt — we\'re experiencing turbulence.', synonyms: ['rough air', 'bumpiness'] },
      { word: 'aisle', phonetic: '/aɪl/', pos: 'noun', definition: 'A passage between seats.', example: 'Could I have an aisle seat, please?', synonyms: ['passage', 'walkway'] },
      { word: 'overbooked', phonetic: '/ˌoʊ.vərˈbʊkt/', pos: 'adjective', definition: 'Having more reservations than available seats.', example: 'The flight was overbooked, so they offered compensation.', synonyms: ['fully booked', 'oversubscribed'] },
      { word: 'baggage claim', phonetic: '/ˈbæɡ.ɪdʒ kleɪm/', pos: 'noun', definition: 'The area where passengers collect their luggage.', example: 'After landing, follow the signs to baggage claim.', synonyms: ['luggage collection', 'carousel'] },
      { word: 'transit', phonetic: '/ˈtræn.zɪt/', pos: 'noun', definition: 'The act of passing through a place on the way.', example: 'We were in transit for six hours at the airport.', synonyms: ['transfer', 'layover', 'passage'] },
    ],
  },
  {
    id: 'restaurant-dining',
    title: 'Restaurant & Dining',
    icon: '🍽️',
    description: 'Vocabulary for ordering food and dining out.',
    level: 'A2',
    wordCount: 12,
    parentCategory: 'scenarios',
    words: [
      { word: 'appetizer', phonetic: '/ˈæp.ɪ.taɪ.zər/', pos: 'noun', definition: 'A small dish served before the main course.', example: 'Would you like to start with an appetizer?', synonyms: ['starter', 'hors d\'oeuvre', 'beginner'] },
      { word: 'entrée', phonetic: '/ˈɒn.tr eɪ/', pos: 'noun', definition: 'The main course of a meal.', example: 'For my entrée, I\'ll have the grilled salmon.', synonyms: ['main course', 'main dish'] },
      { word: 'cutlery', phonetic: '/ˈkʌt.lər.i/', pos: 'noun', definition: 'Knives, forks, and spoons used for eating.', uk: 'cutlery', us: 'silverware', example: 'Could we have some extra cutlery, please?', synonyms: ['utensils', 'flatware'] },
      { word: 'reservation', phonetic: '/ˌrez.əˈveɪ.ʃən/', pos: 'noun', definition: 'An advance booking for a table.', example: 'I have a reservation under the name Smith.', synonyms: ['booking', 'table booking'] },
      { word: 'bill', phonetic: '/bɪl/', pos: 'noun', definition: 'A list of charges for food and drinks.', uk: 'bill', us: 'check', example: 'Could we have the bill, please?', synonyms: ['check', 'invoice', 'tab'] },
      { word: 'tip', phonetic: '/tɪp/', pos: 'noun', definition: 'An extra payment for good service.', example: 'I always leave a 15% tip for good service.', synonyms: ['gratuity', 'bonus'] },
      { word: 'dietary', phonetic: '/ˈdaɪ.ə.ter.i/', pos: 'adjective', definition: 'Related to the food someone eats.', example: 'Do you have any dietary restrictions or allergies?', synonyms: ['nutritional', 'food-related'] },
      { word: 'beverage', phonetic: '/ˈbev.ər.ɪdʒ/', pos: 'noun', definition: 'A drink, especially one other than water.', example: 'Would you like a beverage with your meal?', synonyms: ['drink', 'refreshment'] },
      { word: 'dessert', phonetic: '/dɪˈzɜːt/', pos: 'noun', definition: 'A sweet course eaten at the end of a meal.', example: 'The chocolate dessert was absolutely delicious.', synonyms: ['sweet', 'pudding', 'dessert course'] },
      { word: 'special', phonetic: '/ˈspeʃ.əl/', pos: 'noun', definition: 'A dish offered in addition to the regular menu.', example: 'What\'s today\'s special?', synonyms: ['feature', 'daily dish', 'recommendation'] },
      { word: 'allergen', phonetic: '/ˈæl.ə.dʒən/', pos: 'noun', definition: 'A substance that causes an allergic reaction.', example: 'Please inform us of any allergens in the dish.', synonyms: ['allergy trigger', 'irritant'] },
      { word: 'takeaway', phonetic: '/ˈteɪk.ə.weɪ/', pos: 'noun', definition: 'Food prepared to be eaten elsewhere.', uk: 'takeaway', us: 'takeout', example: 'Let\'s get a takeaway tonight — I don\'t feel like cooking.', synonyms: ['takeout', 'food to go'] },
    ],
  },
  {
    id: 'shopping-retail',
    title: 'Shopping & Retail',
    icon: '🛍️',
    description: 'Vocabulary for shopping, returns, and customer service.',
    level: 'A2',
    wordCount: 10,
    parentCategory: 'scenarios',
    words: [
      { word: 'refund', phonetic: '/ˈriː.fʌnd/', pos: 'noun', definition: 'A return of money for a purchased item.', example: 'I\'d like a refund — this shirt doesn\'t fit.', synonyms: ['reimbursement', 'money back'] },
      { word: 'discount', phonetic: '/ˈdɪs.kaʊnt/', pos: 'noun', definition: 'A reduction in the usual price.', example: 'They\'re offering a 20% discount this weekend.', synonyms: ['reduction', 'sale', 'bargain'] },
      { word: 'receipt', phonetic: '/rɪˈsiːt/', pos: 'noun', definition: 'A written proof of purchase.', example: 'Keep your receipt in case you need to return the item.', synonyms: ['proof of purchase', 'sales slip'] },
      { word: 'bargain', phonetic: '/ˈbɑː.ɡɪn/', pos: 'noun', definition: 'Something bought for less than its usual price.', example: 'These shoes were a real bargain — only $20!', synonyms: ['deal', 'steal', 'good value'] },
      { word: 'stock', phonetic: '/stɒk/', pos: 'noun', definition: 'The supply of goods available for sale.', example: 'I\'m sorry, we don\'t have that size in stock.', synonyms: ['supply', 'inventory', 'availability'] },
      { word: 'fitting room', phonetic: '/ˈfɪt.ɪŋ ruːm/', pos: 'noun', definition: 'A small room where you try on clothes.', example: 'The fitting rooms are at the back of the store.', synonyms: ['changing room', 'trial room'] },
      { word: 'warranty', phonetic: '/ˈwɒr.ən.ti/', pos: 'noun', definition: 'A written guarantee of product quality.', example: 'This TV comes with a two-year warranty.', synonyms: ['guarantee', 'assurance', 'coverage'] },
      { word: 'checkout', phonetic: '/ˈtʃek.aʊt/', pos: 'noun', definition: 'The place where you pay for goods.', example: 'There\'s a long queue at the checkout.', synonyms: ['cashier', 'till', 'register'] },
      { word: 'exchange', phonetic: '/ɪksˈtʃeɪndʒ/', pos: 'verb', definition: 'To give something and receive something else.', example: 'Can I exchange this for a larger size?', synonyms: ['swap', 'trade', 'replace'] },
      { word: 'clearance', phonetic: '/ˈklɪə.rəns/', pos: 'noun', definition: 'A sale to get rid of old stock.', example: 'Everything in the clearance section is 50% off.', synonyms: ['sale', 'markdown', 'closeout'] },
    ],
  },

  // ===== PEOPLE & RELATIONSHIPS =====
  {
    id: 'family-members',
    title: 'Family Members',
    icon: '👨‍👩‍👧‍👦',
    description: 'Vocabulary for talking about family relationships.',
    level: 'A1',
    wordCount: 12,
    parentCategory: 'people',
    words: [
      { word: 'sibling', phonetic: '/ˈsɪb.lɪŋ/', pos: 'noun', definition: 'A brother or sister.', example: 'Do you have any siblings?', synonyms: ['brother or sister'] },
      { word: 'spouse', phonetic: '/spaʊz/', pos: 'noun', definition: 'A husband or wife.', example: 'You\'re welcome to bring your spouse to the event.', synonyms: ['partner', 'husband', 'wife'] },
      { word: 'nephew', phonetic: '/ˈnev.juː/', pos: 'noun', definition: 'The son of your brother or sister.', example: 'My nephew just turned five years old.', synonyms: [] },
      { word: 'niece', phonetic: '/niːs/', pos: 'noun', definition: 'The daughter of your brother or sister.', example: 'My niece lives in London.', synonyms: [] },
      { word: 'relative', phonetic: '/ˈrel.ə.tɪv/', pos: 'noun', definition: 'A member of your family.', example: 'We have relatives visiting from abroad.', synonyms: ['family member', 'kin'] },
      { word: 'stepfather', phonetic: '/ˈstepˌfɑː.ðər/', pos: 'noun', definition: 'The husband of your mother (not your biological father).', example: 'My stepfather is very kind and supportive.', synonyms: [] },
      { word: 'half-sister', phonetic: '/ˈhɑːf ˈsɪs.tər/', pos: 'noun', definition: 'A sister who shares one parent with you.', example: 'My half-sister and I have the same mother.', synonyms: [] },
      { word: 'godparent', phonetic: '/ˈɡɒdˌpeə.rənt/', pos: 'noun', definition: 'A person who promises to help a child\'s upbringing.', example: 'Her godparents gave her a beautiful gift.', synonyms: [] },
      { word: 'twin', phonetic: '/twɪn/', pos: 'noun', definition: 'One of two children born at the same time.', example: 'My twins start school next September.', synonyms: [] },
      { word: 'only child', phonetic: '/ˌoʊn.li ˈtʃaɪld/', pos: 'noun', definition: 'A child with no brothers or sisters.', example: 'As an only child, I learned to entertain myself.', synonyms: [] },
      { word: 'in-law', phonetic: '/ˈɪn.lɔː/', pos: 'noun', definition: 'A relative by marriage.', example: 'My mother-in-law is coming to visit next week.', synonyms: ['relative by marriage'] },
      { word: 'guardian', phonetic: '/ˈɡɑː.di.ən/', pos: 'noun', definition: 'A person who is legally responsible for a child.', example: 'After her parents passed, her aunt became her guardian.', synonyms: ['protector', 'custodian'] },
    ],
  },
  {
    id: 'workplace-colleagues',
    title: 'Workplace & Colleagues',
    icon: '👔',
    description: 'Vocabulary for describing coworkers and workplace relationships.',
    level: 'B1',
    wordCount: 10,
    parentCategory: 'people',
    words: [
      { word: 'colleague', phonetic: '/ˈkɒl.iːɡ/', pos: 'noun', definition: 'A person you work with.', example: 'My colleague and I are working on the same project.', synonyms: ['coworker', 'teammate'] },
      { word: 'supervisor', phonetic: '/ˈsuː.pə.vaɪ.zər/', pos: 'noun', definition: 'A person who oversees your work.', example: 'I need to ask my supervisor for approval.', synonyms: ['manager', 'boss', 'overseer'] },
      { word: 'subordinate', phonetic: '/səˈbɔː.dɪ.nət/', pos: 'noun', definition: 'A person who is lower in rank.', example: 'A good leader treats subordinates with respect.', synonyms: ['junior', 'underling'] },
      { word: 'mentor', phonetic: '/ˈmen.tɔːr/', pos: 'noun', definition: 'An experienced person who guides another.', example: 'She found a great mentor in her first job.', synonyms: ['advisor', 'guide', 'coach'] },
      { word: 'intern', phonetic: '/ˈɪn.tɜːn/', pos: 'noun', definition: 'A student or trainee working to gain experience.', example: 'The intern showed great potential during the summer.', synonyms: ['trainee', 'apprentice'] },
      { word: 'counterpart', phonetic: '/ˈkaʊn.tə.pɑːt/', pos: 'noun', definition: 'A person in a similar role in another organization.', example: 'I met with my counterpart from the London office.', synonyms: ['equivalent', 'parallel'] },
      { word: 'acquaintance', phonetic: '/əˈkweɪn.tən.s/', pos: 'noun', definition: 'A person you know slightly but aren\'t close to.', example: 'He\'s not a friend — just an acquaintance from work.', synonyms: ['contact', 'connection'] },
      { word: 'subordinate', phonetic: '/səˈbɔː.dɪ.nət/', pos: 'noun', definition: 'A person lower in rank or position.', example: 'She manages five subordinates.', synonyms: ['junior', 'report'] },
      { word: 'peer', phonetic: '/pɪr/', pos: 'noun', definition: 'A person of the same level or status.', example: 'She is highly respected by her peers.', synonyms: ['equal', 'contemporary'] },
      { word: 'freelancer', phonetic: '/ˈfriː.læn.sər/', pos: 'noun', definition: 'A self-employed person offering services.', example: 'We hired a freelancer to design our website.', synonyms: ['contractor', 'independent worker'] },
    ],
  },

  // ===== DAILY LIFE =====
  {
    id: 'home-household',
    title: 'Home & Household',
    icon: '🏠',
    description: 'Everyday vocabulary for home life and household tasks.',
    level: 'A2',
    wordCount: 10,
    parentCategory: 'daily',
    words: [
      { word: 'landlord', phonetic: '/ˈlænd.lɔːd/', pos: 'noun', definition: 'A person who rents out property.', example: 'My landlord agreed to fix the leaking roof.', synonyms: ['property owner', 'lessor'] },
      { word: 'tenant', phonetic: '/ˈten.ənt/', pos: 'noun', definition: 'A person who rents property.', example: 'The tenant has lived here for three years.', synonyms: ['renter', 'lessee'] },
      { word: 'mortgage', phonetic: '/ˈmɔː.ɡɪdʒ/', pos: 'noun', definition: 'A loan for buying a house.', example: 'We finally paid off our mortgage after 25 years.', synonyms: ['home loan', 'property loan'] },
      { word: 'utilities', phonetic: '/juːˈtɪl.ɪ.tiz/', pos: 'noun', definition: 'Services like electricity, water, and gas.', example: 'Utilities are included in the rent.', synonyms: ['services', 'bills'] },
      { word: 'furniture', phonetic: '/ˈfɜː.nɪ.tʃər/', pos: 'noun', definition: 'Movable objects like tables and chairs.', example: 'We bought new furniture for the living room.', synonyms: ['furnishings', 'household items'] },
      { word: 'appliance', phonetic: '/əˈplaɪ.əns/', pos: 'noun', definition: 'A device for a specific household task.', example: 'The kitchen has all modern appliances.', synonyms: ['device', 'machine', 'equipment'] },
      { word: 'renovation', phonetic: '/ˌren.əˈveɪ.ʃən/', pos: 'noun', definition: 'The process of repairing and improving a building.', example: 'The renovation took three months to complete.', synonyms: ['remodel', 'restoration', 'refurbishment'] },
      { word: 'chore', phonetic: '/tʃɔːr/', pos: 'noun', definition: 'A routine task, especially a household one.', example: 'I hate doing the dishes — it\'s my least favorite chore.', synonyms: ['task', 'duty', 'errand'] },
      { word: 'neighborhood', phonetic: '/ˈneɪ.bə.hʊd/', pos: 'noun', definition: 'The area around where you live.', example: 'It\'s a quiet neighborhood with friendly people.', synonyms: ['community', 'area', 'district'] },
      { word: 'maintenance', phonetic: '/ˈmeɪn.tɪ.nən.s/', pos: 'noun', definition: 'Work to keep something in good condition.', example: 'Regular maintenance prevents bigger problems.', synonyms: ['upkeep', 'care', 'servicing'] },
    ],
  },
  {
    id: 'food-cooking',
    title: 'Food & Cooking',
    icon: '🍳',
    description: 'Vocabulary for cooking methods, ingredients, and food preparation.',
    level: 'A2',
    wordCount: 10,
    parentCategory: 'daily',
    words: [
      { word: 'ingredient', phonetic: '/ɪnˈɡriː.di.ənt/', pos: 'noun', definition: 'A component used in cooking.', example: 'Fresh ingredients make the best dishes.', synonyms: ['component', 'element'] },
      { word: 'recipe', phonetic: '/ˈres.ɪ.pi/', pos: 'noun', definition: 'Instructions for preparing a dish.', example: 'This recipe serves four people.', synonyms: ['formula', 'cooking instructions'] },
      { word: 'simmer', phonetic: '/ˈsɪm.ər/', pos: 'verb', definition: 'To cook just below boiling point.', example: 'Let the soup simmer for 20 minutes.', synonyms: ['stew', 'slow cook'] },
      { word: 'marinate', phonetic: '/ˈmær.ɪ.neɪt/', pos: 'verb', definition: 'To soak food in a flavored liquid.', example: 'Marinate the chicken overnight for the best flavor.', synonyms: ['soak', 'steep'] },
      { word: 'garnish', phonetic: '/ˈɡɑː.nɪʃ/', pos: 'verb', definition: 'To decorate a dish with small items.', example: 'Garnish the plate with fresh herbs before serving.', synonyms: ['decorate', 'adorn'] },
      { word: 'seasoning', phonetic: '/ˈsiː.zən.ɪŋ/', pos: 'noun', definition: 'Salt, pepper, and spices added to food.', example: 'Add more seasoning — it tastes bland.', synonyms: ['spices', 'flavoring', 'herbs'] },
      { word: 'bake', phonetic: '/beɪk/', pos: 'verb', definition: 'To cook food in an oven.', example: 'Bake the cake at 180°C for 30 minutes.', synonyms: ['oven-cook', 'roast'] },
      { word: 'saute', phonetic: '/ˈsoʊ.teɪ/', pos: 'verb', definition: 'To fry quickly in a small amount of oil.', example: 'Sauté the onions until they\'re golden.', synonyms: ['pan-fry', 'stir-fry'] },
      { word: 'portion', phonetic: '/ˈpɔː.ʃən/', pos: 'noun', definition: 'An amount of food served to one person.', example: 'The portions at this restaurant are huge!', synonyms: ['serving', 'share', 'helping'] },
      { word: 'organic', phonetic: '/ɔːˈɡæn.ɪk/', pos: 'adjective', definition: 'Food produced without artificial chemicals.', example: 'I prefer to buy organic vegetables.', synonyms: ['natural', 'chemical-free'] },
    ],
  },
];

// Parent category info
export const vocabParentCategories = {
  jobs: { id: 'jobs', title: 'Jobs & Professions', icon: '💼', description: 'Industry-specific vocabulary' },
  scenarios: { id: 'scenarios', title: 'Real-Life Scenarios', icon: '🌍', description: 'Everyday situations and contexts' },
  people: { id: 'people', title: 'People & Relationships', icon: '👥', description: 'Vocabulary about people in your life' },
  daily: { id: 'daily', title: 'Daily Life', icon: '🏡', description: 'Home, food, and everyday activities' },
  academic: { id: 'academic', title: 'Academic & Study', icon: '🎓', description: 'University and research vocabulary' },
};
