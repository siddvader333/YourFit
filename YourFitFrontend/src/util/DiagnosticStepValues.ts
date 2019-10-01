import DiagnosticStepType from './Types';
/* Enum that encapsulates workflow steps for diagnostic  */
const DiagnosticSteps: Array<DiagnosticStepType> = [
	{
		stepName: 'GENDER_PREF_STEP',
		stepTitle: 'What is your gender?',
		onlyOne: true,
		displayItems: [
			{
				value: 'Male',
				isSelected: false
			},
			{
				value: 'Female',
				isSelected: false
			},
			{
				value: 'Other',
				isSelected: false
			}
		]
	},
	{
		stepName: 'BRAND_PREF_STEP',
		stepTitle: 'What kind of brands do you like?',
		onlyOne: false,
		displayItems: [
			{
				value: 'Zara',
				isSelected: false
			},
			{
				value: 'H&M',
				isSelected: false
			},
			{
				value: 'Frank and Oak',
				isSelected: false
			},
			{
				value: 'Nike',
				isSelected: false
			},
			{
				value: 'Uniqlo',
				isSelected: false
			}
		]
	},
	{ stepName: 'FINAL_STEP', onlyOne: false }
];

export default DiagnosticSteps;
