<template>
    <v-content>
        <v-container class="center" fluid>
            <h3>Questionario</h3>
            <br>
        </v-container>
        <div id="surveyContainer"><survey :survey="survey"></survey></div>
    </v-content>
</template>

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
<script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>
<script>
//https://github.com/surveyjs/surveyjs_vue_quickstart
import * as SurveyVue from 'survey-vue';
import 'bootstrap/dist/css/bootstrap.css';

var Survey = SurveyVue.Survey
Survey.cssType = "bootstrap";

//If you want to add custom widgets package
//Add these imports
//import * as widgets from "surveyjs-widgets";
//import "inputmask/dist/inputmask/phone-codes/phone.js";
//And initialize widgets you are want ti use
//widgets.icheck(SurveyVue);
//widgets.select2(SurveyVue);
//widgets.inputmask(SurveyVue);
//widgets.jquerybarrating(SurveyVue);
//widgets.jqueryuidatepicker(SurveyVue);
//widgets.nouislider(SurveyVue);
//widgets.select2tagbox(SurveyVue);
//widgets.signaturepad(SurveyVue);
//widgets.sortablejs(SurveyVue);
//widgets.ckeditor(SurveyVue);
//widgets.autocomplete(SurveyVue);
//widgets.bootstrapslider(SurveyVue);

export default {
  name: 'surveyContainer',
  components: {
    Survey,
  },
  data () {
    //Use https://surveyjs.io/create-survey/ to create a Survey
    var surveyJSON = 
    {
        "pages": [
        {
        "name": "Informazioni base",
        "elements": [
            {
            "type": "radiogroup",
            "name": "gender",
            "title": "Qual'è il tuo sesso?",
            "isRequired": true,
            "choices": [
            {
            "value": "male",
            "text": "Maschio"
            },
            {
            "value": "female",
            "text": "Femmina"
            }
            ]
            },
            {
            "type": "text",
            "name": "yearOfBirth",
            "title": "In che anno sei nato?",
            "isRequired": true,
            "validators": [
            {
            "type": "regex",
            "text": "Anno errato",
            "regex": "^\\d{4}$"
            }
            ],
            "inputType": "number"
            },
            {
            "type": "text",
            "name": "cap",
            "title": "Qual'è il tuo Codice di Avviamento Postale (CAP)?",
            "isRequired": true,
            "validators": [
            {
            "type": "regex",
            "text": "CAP non valido",
            "regex": "^\\d{5}$"
            }
            ],
            "inputType": "number"
            },
            {
            "type": "boolean",
            "name": "swab",
            "title": "Hai richiesto uno o più tamponi?",
            "isRequired": true,
            "labelTrue": "Si",
            "labelFalse": "No"
            },
            {
            "type": "datepicker",
            "name": "swabDate",
            "inputType": "date",
            "dateFormat": "mm/dd/yy",
            "visibleIf": "{swab} = true",
            "title": "In che data hai effettuato l'ultimo tampone?"
            },
            {
            "type": "rating",
            "name": "countSwab",
            "visible": false,
            "visibleIf": "{swab} = true",
            "title": "Quanti tamponi hai fatto?",
            "requiredIf": "{swab} = true",
            "rateMax": 10
            },
            {
            "type": "rating",
            "name": "countPositiveSwab",
            "visible": false,
            "visibleIf": "{swab} = true",
            "title": "A quanti tamponi sei risultato positivo al COVID-19?",
            "requiredIf": "{swab} = true",
            "validators": [
            {
            "type": "expression",
            "expression": "{countPositiveSwab} <= {countSwab}"
            }
            ],
            "rateMax": 10
            }
        ],
        "title": "Informazioni base"
        },
        {
        "name": "Condizioni mediche",
        "elements": [
            {
            "type": "checkbox",
            "name": "pathologies",
            "title": "Quali di queste patologie mediche hai?",
            "choices": [
            {
            "value": "overweight",
            "text": "Sovrappeso"
            },
            {
            "value": "hypertension",
            "text": "Problemi cardiaci (e.g. ipertensione)"
            },
            {
            "value": "diabetes",
            "text": "Diabete"
            },
            {
            "value": "ahsma",
            "text": "Asma"
            }
            ],
            "otherText": "Ho l'asma"
            }
        ],
        "title": "Condizioni mediche"
        },
        {
        "name": "Informazioni aggiuntive",
        "elements": [
            {
            "type": "boolean",
            "name": "work",
            "title": "Ti sposti di casa per lavoro?",
            "isRequired": true,
            "labelTrue": "Si",
            "labelFalse": "No"
            },
            {
            "type": "boolean",
            "name": "moving",
            "title": "Ti sposti di casa per fare la spesa o altri motivi?",
            "isRequired": true,
            "labelTrue": "Si",
            "labelFalse": "No"
            },
            {
            "type": "boolean",
            "name": "contactWithPositive",
            "title": "Hai avuto contatti con persone positive al COVID-19 negli scorsi 14 giorni?",
            "isRequired": true,
            "labelTrue": "Si",
            "labelFalse": "No"
            },
            {
            "type": "boolean",
            "name": "travelledToProvince",
            "title": "Hai frequentato province in cui ci sono positivi al COVID-19 negli scorsi 14 giorni?",
            "isRequired": true,
            "labelTrue": "Si",
            "labelFalse": "No"
            }
        ],
        "title": "Informazioni aggiuntive"
        },
        {
        "name": "Sintomi",
        "elements": [
            {
            "type": "checkbox",
            "name": "symptoms",
            "title": "Hai avuto qualcuno di questi sintomi negli ultimi 14 giorni?",
            "choices": [
            {
            "value": "fever",
            "text": "Febbre"
            },
            {
            "value": "dry_cough",
            "text": "Tosse secca"
            },
            {
            "value": "wet_cough",
            "text": "Tosse grassa"
            },
            {
            "value": "nobreath",
            "text": "Mancanza di respiro"
            },
            {
            "value": "fatigue",
            "text": "Stanchezza"
            },
            {
            "value": "sputum",
            "text": "Produzione di catarro"
            },
            {
            "value": "headache",
            "text": "Mal di testa"
            },
            {
            "value": "diarrhea",
            "text": "Diarrea"
            },
            {
            "value": "pneumonia",
            "text": "Polmonite"
            },
            {
            "value": "stuffynose",
            "text": "Naso tappato"
            },
            {
            "value": "cold",
            "text": "Raffreddore"
            },
            {
            "value": "taste_altered",
            "text": "Gusto alterato"
            },
            {
            "value": "smell_altered",
            "text": "Odore alterato"
            },
            {
            "value": "muscle_pain",
            "text": "Dolori muscolari"
            },
            {
            "value": "conjunctivitis",
            "text": "Congiuntivite"
            }
            ]
            }
        ],
        "title": "Sintomi"
        }
        ]
        }
    
    //Create the model and pass it into VueSJ Survey component
    var model = new SurveyVue.Model(surveyJSON)
    //You may set model properties
    // model.mode="display"
    // TODO: post surveyJSON to the database
    // TODO: save the date of the survey!
    // TODO: save id (and store it on the browser) of who took the survey or use authentication

    return {
        survey: model
    }
  }
}
</script>