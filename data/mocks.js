import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    findCountry: (root, args) => {
		return { countryName: args.country }
	}
  }),
  Country: () => ({
		id: 			 () => casual.id, 
		country: 		 () => casual.country, 
		abbreviation: 	 () => casual.abbreviation, 
		createdAt: 		 () => casual.createdAt, 
		updatedAt: 		 () => casual.updatedAt, 
		score: 			 () => casual.score,
		callingCode: 	 () => casual.callingCode,
	})
};

export default mocks;