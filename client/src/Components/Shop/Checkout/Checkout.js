import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import {generateData, isFormValid, populateFields, updateForm} from "../../../helpers/Forms/formActions";
import orderClasses from './Checkout.module.css';
import classes from "../../Register/Register.module.css";
import FormField from "../../../helpers/Forms/FormField";
import StyledButton from "../../../helpers/Button/Button";
import {connect} from "react-redux";
import {placeOrder, updateHistory} from "../../../actions/User/userActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-solid-svg-icons/faSmile";
import {Link} from "react-router-dom";
import Page404 from "../../../helpers/404/page404";
import CartBlock from "../ShoppingCart/CartBlock/CartBlock";
import Checkbox from "../../../helpers/Forms/Checkbox";
import formStyles from "../../../helpers/Forms/FormField.module.css";

class Checkout extends Component {
    state = {
        unwantedEntry: false,
        orderSuccess: false,
        id: null,
        formError: false,
        formSuccess: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'First Name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Last name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            country: {
                element: 'select',
                value: '',
                config: {
                    label: 'Country',
                    name: 'country_input',
                    options: [
                        {
                            key: "['Nigeria','NG']",
                            value: "Nigeria"
                        },
                        {
                            key: "['Afghanistan','AF']",
                            value: "Afghanistan"
                        },
                        {
                            key: "['Ãƒâ€¦land Islands','AX']",
                            value: "Ãƒâ€¦land Islands"
                        },
                        {
                            key: "['Albania','AL']",
                            value: "Albania"
                        },
                        {
                            key: "['Algeria','DZ']",
                            value: "Algeria"
                        },
                        {
                            key: "['American Samoa','AS']",
                            value: "American Samoa"
                        },
                        {
                            key: "['Andorra','AD']",
                            value: "Andorra"
                        },
                        {
                            key: "['Angola','AO']",
                            value: "Angola"
                        },
                        {
                            key: "['Anguilla','AI']",
                            value: "Anguilla"
                        },
                        {
                            key: "['Antarctica','AQ']",
                            value: "Antarctica"
                        },
                        {
                            key: "['Antigua and Barbuda','AG']",
                            value: "Antigua and Barbuda"
                        },
                        {
                            key: "['Argentina','AR']",
                            value: "Argentina"
                        },
                        {
                            key: "['Armenia','AM']",
                            value: "Armenia"
                        },
                        {
                            key: "['Aruba','AW']",
                            value: "Aruba"
                        },
                        {
                            key: "['Australia','AU']",
                            value: "Australia"
                        },
                        {
                            key: "['Austria','AT']",
                            value: "Austria"
                        },
                        {
                            key: "['Azerbaijan','AZ']",
                            value: "Azerbaijan"
                        },
                        {
                            key: "['Bahamas','BS']",
                            value: "Bahamas"
                        },
                        {
                            key: "['Bahrain','BH']",
                            value: "Bahrain"
                        },
                        {
                            key: "['Bangladesh','BD']",
                            value: "Bangladesh"
                        },
                        {
                            key: "['Barbados','BB']",
                            value: "Barbados"
                        },
                        {
                            key: "['Belarus','BY']",
                            value: "Belarus"
                        },
                        {
                            key: "['Belgium','BE']",
                            value: "Belgium"
                        },
                        {
                            key: "['Belize','BZ']",
                            value: "Belize"
                        },
                        {
                            key: "['Benin','BJ']",
                            value: "Benin"
                        },
                        {
                            key: "['Bermuda','BM']",
                            value: "Bermuda"
                        },
                        {
                            key: "['Bhutan','BT']",
                            value: "Bhutan"
                        },
                        {
                            key: "['Bolivia, Plurinational State of','BO']",
                            value: "\"Bolivia, Plurinational State of\""
                        },
                        {
                            key: "['Bonaire, Sint Eustatius and Saba','BQ']",
                            value: "\"Bonaire, Sint Eustatius and Saba\""
                        },
                        {
                            key: "['Bosnia and Herzegovina','BA']",
                            value: "Bosnia and Herzegovina"
                        },
                        {
                            key: "['Botswana','BW']",
                            value: "Botswana"
                        },
                        {
                            key: "['Bouvet Island','BV']",
                            value: "Bouvet Island"
                        },
                        {
                            key: "['Brazil','BR']",
                            value: "Brazil"
                        },
                        {
                            key: "['British Indian Ocean Territory','IO']",
                            value: "British Indian Ocean Territory"
                        },
                        {
                            key: "['Brunei Darussalam','BN']",
                            value: "Brunei Darussalam"
                        },
                        {
                            key: "['Bulgaria','BG']",
                            value: "Bulgaria"
                        },
                        {
                            key: "['Burkina Faso','BF']",
                            value: "Burkina Faso"
                        },
                        {
                            key: "['Burundi','BI']",
                            value: "Burundi"
                        },
                        {
                            key: "['Cambodia','KH']",
                            value: "Cambodia"
                        },
                        {
                            key: "['Cameroon','CM']",
                            value: "Cameroon"
                        },
                        {
                            key: "['Canada','CA']",
                            value: "Canada"
                        },
                        {
                            key: "['Cape Verde','CV']",
                            value: "Cape Verde"
                        },
                        {
                            key: "['Cayman Islands','KY']",
                            value: "Cayman Islands"
                        },
                        {
                            key: "['Central African Republic','CF']",
                            value: "Central African Republic"
                        },
                        {
                            key: "['Chad','TD']",
                            value: "Chad"
                        },
                        {
                            key: "['Chile','CL']",
                            value: "Chile"
                        },
                        {
                            key: "['China','CN']",
                            value: "China"
                        },
                        {
                            key: "['Christmas Island','CX']",
                            value: "Christmas Island"
                        },
                        {
                            key: "['Cocos (Keeling) Islands','CC']",
                            value: "Cocos (Keeling) Islands"
                        },
                        {
                            key: "['Colombia','CO']",
                            value: "Colombia"
                        },
                        {
                            key: "['Comoros','KM']",
                            value: "Comoros"
                        },
                        {
                            key: "['Congo','CG']",
                            value: "Congo"
                        },
                        {
                            key: "['Congo, the Democratic Republic of the','CD']",
                            value: "\"Congo, the Democratic Republic of the\""
                        },
                        {
                            key: "['Cook Islands','CK']",
                            value: "Cook Islands"
                        },
                        {
                            key: "['Costa Rica','CR']",
                            value: "Costa Rica"
                        },
                        {
                            key: "['CÃƒÂ´te d'Ivoire','CI']",
                            value: "CÃƒÂ´te d'Ivoire"
                        },
                        {
                            key: "['Croatia','HR']",
                            value: "Croatia"
                        },
                        {
                            key: "['Cuba','CU']",
                            value: "Cuba"
                        },
                        {
                            key: "['CuraÃƒÂ§ao','CW']",
                            value: "CuraÃƒÂ§ao"
                        },
                        {
                            key: "['Cyprus','CY']",
                            value: "Cyprus"
                        },
                        {
                            key: "['Czech Republic','CZ']",
                            value: "Czech Republic"
                        },
                        {
                            key: "['Denmark','DK']",
                            value: "Denmark"
                        },
                        {
                            key: "['Djibouti','DJ']",
                            value: "Djibouti"
                        },
                        {
                            key: "['Dominica','DM']",
                            value: "Dominica"
                        },
                        {
                            key: "['Dominican Republic','DO']",
                            value: "Dominican Republic"
                        },
                        {
                            key: "['Ecuador','EC']",
                            value: "Ecuador"
                        },
                        {
                            key: "['Egypt','EG']",
                            value: "Egypt"
                        },
                        {
                            key: "['El Salvador','SV']",
                            value: "El Salvador"
                        },
                        {
                            key: "['Equatorial Guinea','GQ']",
                            value: "Equatorial Guinea"
                        },
                        {
                            key: "['Eritrea','ER']",
                            value: "Eritrea"
                        },
                        {
                            key: "['Estonia','EE']",
                            value: "Estonia"
                        },
                        {
                            key: "['Ethiopia','ET']",
                            value: "Ethiopia"
                        },
                        {
                            key: "['Falkland Islands (Malvinas)','FK']",
                            value: "Falkland Islands (Malvinas)"
                        },
                        {
                            key: "['Faroe Islands','FO']",
                            value: "Faroe Islands"
                        },
                        {
                            key: "['Fiji','FJ']",
                            value: "Fiji"
                        },
                        {
                            key: "['Finland','FI']",
                            value: "Finland"
                        },
                        {
                            key: "['France','FR']",
                            value: "France"
                        },
                        {
                            key: "['French Guiana','GF']",
                            value: "French Guiana"
                        },
                        {
                            key: "['French Polynesia','PF']",
                            value: "French Polynesia"
                        },
                        {
                            key: "['French Southern Territories','TF']",
                            value: "French Southern Territories"
                        },
                        {
                            key: "['Gabon','GA']",
                            value: "Gabon"
                        },
                        {
                            key: "['Gambia','GM']",
                            value: "Gambia"
                        },
                        {
                            key: "['Georgia','GE']",
                            value: "Georgia"
                        },
                        {
                            key: "['Germany','DE']",
                            value: "Germany"
                        },
                        {
                            key: "['Ghana','GH']",
                            value: "Ghana"
                        },
                        {
                            key: "['Gibraltar','GI']",
                            value: "Gibraltar"
                        },
                        {
                            key: "['Greece','GR']",
                            value: "Greece"
                        },
                        {
                            key: "['Greenland','GL']",
                            value: "Greenland"
                        },
                        {
                            key: "['Grenada','GD']",
                            value: "Grenada"
                        },
                        {
                            key: "['Guadeloupe','GP']",
                            value: "Guadeloupe"
                        },
                        {
                            key: "['Guam','GU']",
                            value: "Guam"
                        },
                        {
                            key: "['Guatemala','GT']",
                            value: "Guatemala"
                        },
                        {
                            key: "['Guernsey','GG']",
                            value: "Guernsey"
                        },
                        {
                            key: "['Guinea','GN']",
                            value: "Guinea"
                        },
                        {
                            key: "['Guinea-Bissau','GW']",
                            value: "Guinea-Bissau"
                        },
                        {
                            key: "['Guyana','GY']",
                            value: "Guyana"
                        },
                        {
                            key: "['Haiti','HT']",
                            value: "Haiti"
                        },
                        {
                            key: "['Heard Island and McDonald Islands','HM']",
                            value: "Heard Island and McDonald Islands"
                        },
                        {
                            key: "['Holy See (Vatican City State)','VA']",
                            value: "Holy See (Vatican City State)"
                        },
                        {
                            key: "['Honduras','HN']",
                            value: "Honduras"
                        },
                        {
                            key: "['Hong Kong','HK']",
                            value: "Hong Kong"
                        },
                        {
                            key: "['Hungary','HU']",
                            value: "Hungary"
                        },
                        {
                            key: "['Iceland','IS']",
                            value: "Iceland"
                        },
                        {
                            key: "['India','IN']",
                            value: "India"
                        },
                        {
                            key: "['Indonesia','ID']",
                            value: "Indonesia"
                        },
                        {
                            key: "['Iran, Islamic Republic of','IR']",
                            value: "\"Iran, Islamic Republic of\""
                        },
                        {
                            key: "['Iraq','IQ']",
                            value: "Iraq"
                        },
                        {
                            key: "['Ireland','IE']",
                            value: "Ireland"
                        },
                        {
                            key: "['Isle of Man','IM']",
                            value: "Isle of Man"
                        },
                        {
                            key: "['Israel','IL']",
                            value: "Israel"
                        },
                        {
                            key: "['Italy','IT']",
                            value: "Italy"
                        },
                        {
                            key: "['Jamaica','JM']",
                            value: "Jamaica"
                        },
                        {
                            key: "['Japan','JP']",
                            value: "Japan"
                        },
                        {
                            key: "['Jersey','JE']",
                            value: "Jersey"
                        },
                        {
                            key: "['Jordan','JO']",
                            value: "Jordan"
                        },
                        {
                            key: "['Kazakhstan','KZ']",
                            value: "Kazakhstan"
                        },
                        {
                            key: "['Kenya','KE']",
                            value: "Kenya"
                        },
                        {
                            key: "['Kiribati','KI']",
                            value: "Kiribati"
                        },
                        {
                            key: "['Korea, Democratic People's Republic of','KP']",
                            value: "\"Korea, Democratic People's Republic of\""
                        },
                        {
                            key: "['Korea, Republic of','KR']",
                            value: "\"Korea, Republic of\""
                        },
                        {
                            key: "['Kuwait','KW']",
                            value: "Kuwait"
                        },
                        {
                            key: "[Kyrgyzstan','KG']",
                            value: "yrgyzstan"
                        },
                        {
                            key: "['Lao People`s Democratic Republic','LA']",
                            value: "Lao People's Democratic Republic"
                        },
                        {
                            key: "['Latvia','LV']",
                            value: "Latvia"
                        },
                        {
                            key: "['Lebanon','LB']",
                            value: "Lebanon"
                        },
                        {
                            key: "['Lesotho','LS']",
                            value: "Lesotho"
                        },
                        {
                            key: "['Liberia','LR']",
                            value: "Liberia"
                        },
                        {
                            key: "['Libya','LY']",
                            value: "Libya"
                        },
                        {
                            key: "['Liechtenstein','LI']",
                            value: "Liechtenstein"
                        },
                        {
                            key: "['Lithuania','LT']",
                            value: "Lithuania"
                        },
                        {
                            key: "['Luxembourg','LU']",
                            value: "Luxembourg"
                        },
                        {
                            key: "['Macao','MO']",
                            value: "Macao"
                        },
                        {
                            key: "['Macedonia, the Former Yugoslav Republic of','MK']",
                            value: "\"Macedonia, the Former Yugoslav Republic of\""
                        },
                        {
                            key: "['Madagascar','MG']",
                            value: "Madagascar"
                        },
                        {
                            key: "['Malawi','MW']",
                            value: "Malawi"
                        },
                        {
                            key: "['Malaysia','MY']",
                            value: "Malaysia"
                        },
                        {
                            key: "['Maldives','MV']",
                            value: "Maldives"
                        },
                        {
                            key: "['Mali','ML']",
                            value: "Mali"
                        },
                        {
                            key: "['Malta','MT']",
                            value: "Malta"
                        },
                        {
                            key: "['Marshall Islands','MH']",
                            value: "Marshall Islands"
                        },
                        {
                            key: "['Martinique','MQ']",
                            value: "Martinique"
                        },
                        {
                            key: "['Mauritania','MR']",
                            value: "Mauritania"
                        },
                        {
                            key: "['Mauritius','MU']",
                            value: "Mauritius"
                        },
                        {
                            key: "['Mayotte','YT']",
                            value: "Mayotte"
                        },
                        {
                            key: "['Mexico','MX']",
                            value: "Mexico"
                        },
                        {
                            key: "['Micronesia, Federated States of','FM']",
                            value: "\"Micronesia, Federated States of"
                        },
                        {
                            key: "['Moldova, Republic of','MD']",
                            value: "\"Moldova, Republic of\""
                        },
                        {
                            key: "['Monaco','MC']",
                            value: "Monaco"
                        },
                        {
                            key: "['Mongolia','MN']",
                            value: "Mongolia"
                        },
                        {
                            key: "['Montenegro','ME']",
                            value: "Montenegro"
                        },
                        {
                            key: "['Montserrat','MS']",
                            value: "Montserrat"
                        },
                        {
                            key: "['Morocco','MA']",
                            value: "Morocco"
                        },
                        {
                            key: "['Mozambique','MZ']",
                            value: "Mozambique"
                        },
                        {
                            key: "['Myanmar','MM']",
                            value: "Myanmar"
                        },
                        {
                            key: "['Namibia','NA']",
                            value: "Namibia"
                        },
                        {
                            key: "['Nauru','NR']",
                            value: "Nauru"
                        },
                        {
                            key: "['Nepal','NP']",
                            value: "Nepal"
                        },
                        {
                            key: "['Netherlands','NL']",
                            value: "Netherlands"
                        },
                        {
                            key: "['New Caledonia','NC']",
                            value: "New Caledonia"
                        },
                        {
                            key: "['New Zealand','NZ']",
                            value: "New Zealand"
                        },
                        {
                            key: "['Nicaragua','NI']",
                            value: "Nicaragua"
                        },
                        {
                            key: "['Niger','NE']",
                            value: "Niger"
                        },
                        {
                            key: "['Niue','NU']",
                            value: "Niue"
                        },
                        {
                            key: "['Norfolk Island','NF']",
                            value: "Norfolk Island"
                        },
                        {
                            key: "['Northern Mariana Islands','MP']",
                            value: "Northern Mariana Islands"
                        },
                        {
                            key: "['Norway','NO']",
                            value: "Norway"
                        },
                        {
                            key: "['Oman','OM']",
                            value: "Oman"
                        },
                        {
                            key: "['Pakistan','PK']",
                            value: "Pakistan"
                        },
                        {
                            key: "['Palau','PW']",
                            value: "Palau"
                        },
                        {
                            key: "['Palestine, State of','PS']",
                            value: "\"Palestine, State of\""
                        },
                        {
                            key: "['Panama','PA']",
                            value: "Panama"
                        },
                        {
                            key: "['Papua New Guinea','PG']",
                            value: "Papua New Guinea"
                        },
                        {
                            key: "['Paraguay','PY']",
                            value: "Paraguay"
                        },
                        {
                            key: "['Peru','PE']",
                            value: "Peru"
                        },
                        {
                            key: "['Philippines','PH']",
                            value: "Philippines"
                        },
                        {
                            key: "['Pitcairn','PN']",
                            value: "Pitcairn"
                        },
                        {
                            key: "['Poland','PL']",
                            value: "Poland"
                        },
                        {
                            key: "['Portugal','PT']",
                            value: "Portugal"
                        },
                        {
                            key: "['Puerto Rico','PR']",
                            value: "Puerto Rico"
                        },
                        {
                            key: "['Qatar','QA']",
                            value: "Qatar"
                        },
                        {
                            key: "['RÃƒÂ©union','RE']",
                            value: "RÃƒÂ©union"
                        },
                        {
                            key: "['Romania','RO']",
                            value: "Romania"
                        },
                        {
                            key: "['Russian Federation','RU']",
                            value: "Russian Federation"
                        },
                        {
                            key: "['Rwanda','RW']",
                            value: "Rwanda"
                        },
                        {
                            key: "['Saint BarthÃƒÂ©lemy','BL']",
                            value: "Saint BarthÃƒÂ©lemy"
                        },
                        {
                            key: "['Saint Helena','Ascension and Tristan da Cunha','SH']",
                            value: "\"Saint Helena, Ascension and Tristan da Cunha\""
                        },
                        {
                            key: "['Saint Kitts and Nevis','KN']",
                            value: "Saint Kitts and Nevis"
                        },
                        {
                            key: "['Saint Lucia','LC']",
                            value: "Saint Lucia"
                        },
                        {
                            key: "['Saint Martin (French part)','MF']",
                            value: "Saint Martin (French part)"
                        },
                        {
                            key: "['Saint Pierre and Miquelon','PM']",
                            value: "Saint Pierre and Miquelon"
                        },
                        {
                            key: "['Saint Vincent and the Grenadines','VC']",
                            value: "Saint Vincent and the Grenadines"
                        },
                        {
                            key: "['Samoa','WS']",
                            value: "Samoa"
                        },
                        {
                            key: "['San Marino','SM']",
                            value: "San Marino"
                        },
                        {
                            key: "['Sao Tome and Principe','ST']",
                            value: "Sao Tome and Principe"
                        },
                        {
                            key: "['Saudi Arabia','SA']",
                            value: "Saudi Arabia"
                        },
                        {
                            key: "['Senegal','SN']",
                            value: "Senegal"
                        },
                        {
                            key: "['Serbia','RS']",
                            value: "Serbia"
                        },
                        {
                            key: "['Seychelles','SC']",
                            value: "Seychelles"
                        },
                        {
                            key: "['Sierra Leone','SL']",
                            value: "Sierra Leone"
                        },
                        {
                            key: "['Singapore','SG']",
                            value: "Singapore"
                        },
                        {
                            key: "['Sint Maarten (Dutch part)','SX']",
                            value: "Sint Maarten (Dutch part)"
                        },
                        {
                            key: "['Slovakia','SK']",
                            value: "Slovakia"
                        },
                        {
                            key: "['Slovenia','SI']",
                            value: "Slovenia"
                        },
                        {
                            key: "['Solomon Islands','SB']",
                            value: "Solomon Islands"
                        },
                        {
                            key: "['Somalia','SO']",
                            value: "Somalia"
                        },
                        {
                            key: "['South Africa','ZA']",
                            value: "South Africa"
                        },
                        {
                            key: "['South Georgia and the South Sandwich Islands','GS']",
                            value: "South Georgia and the South Sandwich Islands"
                        },
                        {
                            key: "['South Sudan','SS']",
                            value: "South Sudan"
                        },
                        {
                            key: "['Spain','ES']",
                            value: "Spain"
                        },
                        {
                            key: "['Sri Lanka','LK']",
                            value: "Sri Lanka"
                        },
                        {
                            key: "['Sudan','SD']",
                            value: "Sudan"
                        },
                        {
                            key: "['Suriname','SR']",
                            value: "Suriname"
                        },
                        {
                            key: "['Svalbard and Jan Mayen','SJ']",
                            value: "Svalbard and Jan Mayen"
                        },
                        {
                            key: "['Swaziland','SZ']",
                            value: "Swaziland"
                        },
                        {
                            key: "['Sweden','SE']",
                            value: "Sweden"
                        },
                        {
                            key: "['Switzerland','CH']",
                            value: "Switzerland"
                        },
                        {
                            key: "['Syrian Arab Republic','SY']",
                            value: "Syrian Arab Republic"
                        },
                        {
                            key: "['Taiwan, Province of China','TW']",
                            value: "\"Taiwan, Province of China\""
                        },
                        {
                            key: "['Tajikistan','TJ']",
                            value: "Tajikistan"
                        },
                        {
                            key: "['Tanzania, United Republic of','TZ']",
                            value: "\"Tanzania, United Republic of\""
                        },
                        {
                            key: "['Thailand','TH']",
                            value: "Thailand"
                        },
                        {
                            key: "['Timor-Leste','TL']",
                            value: "Timor-Leste"
                        },
                        {
                            key: "['Togo','TG']",
                            value: "Togo"
                        },
                        {
                            key: "['Tokelau','TK']",
                            value: "Tokelau"
                        },
                        {
                            key: "['Tonga','TO']",
                            value: "Tonga"
                        },
                        {
                            key: "['Trinidad and Tobago','TT']",
                            value: "Trinidad and Tobago"
                        },
                        {
                            key: "['Tunisia','TN']",
                            value: "Tunisia"
                        },
                        {
                            key: "['Turkey','TR']",
                            value: "Turkey"
                        },
                        {
                            key: "['Turkmenistan','TM']",
                            value: "Turkmenistan"
                        },
                        {
                            key: "['Turks and Caicos Islands','TC']",
                            value: "Turks and Caicos Islands"
                        },
                        {
                            key: "['Tuvalu','TV']",
                            value: "Tuvalu"
                        },
                        {
                            key: "['Uganda','UG']",
                            value: "Uganda"
                        },
                        {
                            key: "['Ukraine','UA']",
                            value: "Ukraine"
                        },
                        {
                            key: "['United Arab Emirates','AE']",
                            value: "United Arab Emirates"
                        },
                        {
                            key: "['United Kingdom','GB']",
                            value: "United Kingdom"
                        },
                        {
                            key: "['United States','US']",
                            value: "United States"
                        },
                        {
                            key: "['United States Minor Outlying Islands','UM']",
                            value: "United States Minor Outlying Islands"
                        },
                        {
                            key: "['Uruguay','UY']",
                            value: "Uruguay"
                        },
                        {
                            key: "['Uzbekistan','UZ']",
                            value: "Uzbekistan"
                        },
                        {
                            key: "['Vanuatu','VU']",
                            value: "Vanuatu"
                        },
                        {
                            key: "['Venezuela, Bolivarian Republic of','VE']",
                            value: "\"Venezuela, Bolivarian Republic of\""
                        },
                        {
                            key: "['Viet Nam','VN']",
                            value: "Viet Nam"
                        },
                        {
                            key: "['Virgin Islands, British','VG']",
                            value: "\"Virgin Islands, British\""
                        },
                        {
                            key: "['Virgin Islands, U.S.','VI']",
                            value: "\"Virgin Islands, U.S.\""
                        },
                        {
                            key: "['Wallis and Futuna','WF']",
                            value: "Wallis and Futuna"
                        },
                        {
                            key: "['Western Sahara','EH']",
                            value: "Western Sahara"
                        },
                        {
                            key: "['Yemen','YE']",
                            value: "Yemen"
                        },
                        {
                            key: "['Zambia','ZM']",
                            value: "Zambia"
                        },
                        {
                            key: "['Zimbabwe','ZW']",
                            value: "Zimbabwe"
                        }
                    ]
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
            city: {
                element: 'input',
                value: '',
                config: {
                    name: 'city_input',
                    type: 'text',
                    placeholder: 'Town / City'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            street: {
                element: 'input',
                value: '',
                config: {
                    name: 'street_input',
                    type: 'text',
                    placeholder: 'Street address'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            unit: {
                element: 'input',
                value: '',
                config: {
                    name: 'unit_input',
                    type: 'text',
                    placeholder: 'Apartment, suite, unit, etc. (optional)'
                },
                validation: {
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            state: {
                element: 'input',
                value: '',
                config: {
                    name: 'state_input',
                    type: 'text',
                    placeholder: 'State / County'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            zip: {
                element: 'input',
                value: '',
                config: {
                    name: 'zip_input',
                    type: 'text',
                    placeholder: 'Postcode / ZIP'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Phone (optional)'
                },
                validation: {
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    };

    componentDidMount() {
        if(!localStorage.getItem('cart')){
            this.setState({
                unwantedEntry: true,
            })
        }

        if(this.props.user.userData.isAuth){
            const newFormData =  populateFields(this.state.formData, this.props.user.userData);
            this.setState({
                formData: newFormData
            })
        }
    }

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'checkout');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    onSubmit = event => {
        event.preventDefault();
        const formData = generateData(this.state.formData, 'checkout');
        const {name, lastName, email, country, city, street, unit, state, zip, phone} = formData;
        const { userId } = this.props.user.userData;
        const formIsValid = isFormValid(this.state.formData, 'checkout');
        const { products } = this.props.location.state;
        const dataToSubmit = {
            name,
            lastName,
            country, city, street, unit, state, zip,
            phone,
            email,
            products,
            userId
        };

        if(formIsValid) {
           this.props.dispatch(placeOrder(dataToSubmit))
               .then(res => {
                   this.setState({id: res.payload.order._id});
                   this.props.dispatch(updateHistory(res.payload.order._id))
                       .then(res => {
                           this.setState({
                               orderSuccess: true,
                           }, () => localStorage.removeItem('cart'))
                       })
               })
        }else {
            this.setState({
                formError: true
            })
        }
    };

    renderShoppingCart = () => (
      <div className={orderClasses.shoppingCartContainer}>
          {
              this.props.location.state.products.map(item => (
                  <CartBlock
                      id={item.id}
                      name={item.name}
                      count={item.count}
                      price={item.price}
                      linkto={item.linkto}
                      key={item.id}/>
              ))
          }
      </div>
    );

    renderForm = () => (
        <div key={'form'}>
            {
                this.props.user.userData ? null :
                    <h5 className={classes.heading}>Have an account? <Link to={'/account/login'} style={{color: '#0082ad'}}>Log in</Link></h5>

            }
            <div className={classes.formContainer}>
                {window.innerWidth < 768 ? <hr /> : null}
                <form onSubmit={this.onSubmit}>
                        <div className={orderClasses.formRow}>
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'lastName'}
                                formData={this.state.formData.lastName}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'country'}
                                formData={this.state.formData.country}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'street'}
                                formData={this.state.formData.street}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'unit'}
                                formData={this.state.formData.unit}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'city'}
                                formData={this.state.formData.city}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'state'}
                                formData={this.state.formData.state}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'zip'}
                                formData={this.state.formData.zip}
                                change={element => this.onChange(element)}
                            />
                            <FormField
                                id={'phone'}
                                formData={this.state.formData.phone}
                                change={element => this.onChange(element)}
                            />
                        </div>
                    {this.state.formError ?
                        <div className={classes.errorLabel}>
                            Please check your data
                        </div>
                        :null }
                    <div className={orderClasses.buttonsContainerCenter}>
                        <StyledButton clicked={this.onSubmit} content={'Place order'}/>
                    </div>
                </form>
            </div>
        </div>
    );

    renderOrderSuccessScreen = () => (
            <div className={orderClasses.orderSuccess}>
                <div className={orderClasses.orderSuccesIcon}>
                    <FontAwesomeIcon icon={faSmile}/>
                </div>
                <h2>Order placed successfully</h2>
                <p>It currently is in a 'Ordered' state. Pay via bank transfer with the information on the next page (this can take longer) or click the PayPayl button to pay now.</p>
                <Link to={{
                    pathname: '/user/checkout/payment',
                    state: {
                        id: this.state.id,
                        total: this.props.location.state.total,
                    }
                }}>
                    <div className={orderClasses.buttonsContainerCenter}>
                        <StyledButton content={'Payment'} />
                    </div>
                </Link>
            </div>
    );

    render() {
        return (
            this.state.unwantedEntry ?
                <Page404 unwanted />
                :
            <Layout no>
                <h1 className={classes.heading}>Checkout details</h1>
                <div className={orderClasses.checkoutContainer}>
                   {
                       this.state.orderSuccess ? this.renderOrderSuccessScreen() :
                       [this.renderShoppingCart(),
                       this.renderForm()]

                   }
               </div>
            </Layout>
        );
    }
}


export default connect()(Checkout);