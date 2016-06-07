//Background Script that obtains Implementation Category from Content Script. Data is extracted from Object that
//has all the links

//Background also connects with Server to get updated data from database for "categoriesObject""//

//Global Variables//
var implementationName="";
var briefUrl="";
var socketId=0;
var request="Hello from Chrome App";
var pythonServerResponse="";
var verification="";


//Object/////
var categoriesObject={
	" Cloud Storage API (DT, Entity, Scheduled Report download)":"https://docs.google.com/document/d/12gsX3S2F-qdWx8MfpzmrRtLEL02kVNX8kFixQVYrSzE/edit",
	" DMP API (Private DMP Integrations)" :"https://docs.google.com/document/d/1q4kpXBK_U7A-rx7GmxsFLc-rgJToSiS2xDapBi6qJ30/edit",
	" Reporting API (Scheduled Report creation)":"https://docs.google.com/document/d/1-PMgYl3Ip8HGvr7W6ClnokscjMbdAKhpBH-76gguAUs/edit",
	" Brand Lift":"https://docs.google.com/document/d/1kG96h3Kvh1KaEIW3D508jl9foB3zNbpfUwHCzVVCozo/edit",
	" DCM Full-to-Hybrid Transition":"https://docs.google.com/document/d/1zWwFNpQJLwSJ043Eq-GIvy_Lp3XuymgF9m3wwArL5Z4/edit",
	" Native Ads":"https://docs.google.com/document/d/1R9Z8UutRf4KsO3VMBbHGwnQHhuKJaURH9OabmCO3hgk/edit",
	" Programmatic Guaranteed (Jordan)": "https://docs.google.com/document/d/1M8MOTbqQp6AwMB-DtkQOnlxxWy5D7LQrlm0COwAbdxU/edit",
	" Programmatic Guaranteed Video (Petra)": "https://docs.google.com/document/d/1VNg2cyTx9U9jMw0C3mNY6dN5s_593KnAxpDRW97iSXU/edit",
	" Tag Guaranteed (Crumbs)":"https://docs.google.com/document/d/1SrYof_NXB5OIxfqesGXzZ838WA7eSBKLSktMTBx8p2E/edit",
	" 3rd Party Ads and Technologies":"https://docs.google.com/document/d/1Gcgaxh9T0C2ReuzZqdzMRzegyH1f3TDd_GidaA77So0/edit",
	" DCM Creatives": "https://docs.google.com/document/d/1qnNyMRxayj9ZzEOciIjkLJsKvOeUvBuG_8SGpabRx9E/edit",
	" DRM Creatives": "https://docs.google.com/document/d/11X0hjEFP6w0UOOtdfLqWpYdYITc3MV_No0mkqbE816U/edit",
	" Dynamic in DBM": "https://docs.google.com/document/d/1Xy8kDTxYYhywXVZSCkE_NpauLWp0m1ZCNGhgXPMiZLA/edit",
	" SCUP/DIGIT": "https://sites.google.com/a/google.com/invite---platform/list-of-how-to-s/reporting/misc/scup-analysis",
	" App Promo Campaign": "https://docs.google.com/document/d/1_m1MITWF1w0RWCKvFqzbYYsey6S__NJvTs9cbexpfBs/edit",
	" Local 3rd Party App Tracker Integration": "https://docs.google.com/document/d/10Er9qyvXbIqWihSJEd0akBkwBlnD3jMNyBRXfeCW6eE/edit",
	" 3PAS Creative Work (Dynam-o)": "https://docs.google.com/document/d/1IngPyShQmr0kK27F3XkqCcU6Mv5R7NIXFGnTJ_0tpEI/edit",
	" Ad Verification (Dynam-o)": "https://support.google.com/adsihc/answer/3271318?hl=en",
	" API/DT Setup (Dynam-o)": "https://docs.google.com/document/d/12gsX3S2F-qdWx8MfpzmrRtLEL02kVNX8kFixQVYrSzE/edit",
	" Cross-product Non-DCM (Dynam-o)":"No Information found",
	" DCM Link (Dynam-o)": "https://docs.google.com/document/d/1YJE1dY-sB2sTP2_5OfnhkPz2esTDjqtN7KqAN4IOKlc/edit",
	" Deals (Dynam-o)":"https://docs.google.com/document/d/1mKliUbtz5b2Dw0bubU_IaU-rI1xm9EJ3RSSeoNkf7B0/edit",
	" DMP Integration (Dynam-o)": "https://docs.google.com/document/d/1Te6WcS1gsGfxDO1D8qhwARofFYvTMpUx0mZ3KBKl0ow/edit",
	" Exchange Seats (Dynam-o)":"https://docs.google.com/document/d/1v06YI8xk1JSGimV4R-JnKISsbuOWCBVGq9sQh9YQW6c/edit",
	" Generate Logins (Dynam-o)": "https://docs.google.com/document/d/1DX3gBMB_xrr6rebsq8dDp70hOxT__ymn1U8f-kPEBP0/edit",
	" Other (Dynam-o)": "No Documentation Available",
	" Proactive Troubleshooting (Dynam-o)": "No Documentation Available",
	" Spend Tracker":"https://docs.google.com/document/d/1muX7Ei42_y1v78qZ4MwyIr6DzretmMPMf_f6_8J0Cxw/edit",
	" DBM Account Implementation (Non Dynamo-o)": "https://docs.google.com/document/d/1_w8AApV_w2tFaHkWv8oZxWkRoeoE7vhOVwwYImYHJ10/edit",
	" Local Exchange Onboarding": "https://docs.google.com/document/d/1v06YI8xk1JSGimV4R-JnKISsbuOWCBVGq9sQh9YQW6c/edit",
	" dealsPro": "Not Available in LATAM",
	" Programmatic Direct (non- dealsPro)":"No Documentation Available",
	" Video Campaign":"url26",
	" New CI Account Implementation":"No Data Available",
	" New DS Account Onboarding":"https://docs.google.com/document/d/18t3mbiP6ulDzp75wvM50mYbOivq4rBYEo3E5A75xRJI/edit",
	" Bid Strategy":"https://docs.google.com/document/d/1fyRYNR-rXX8qV0c12cYRNUHxZq-dQ0axjEO3j-xy1zA/edit",
	" Google Analytics":"https://docs.google.com/document/d/1A_JqTdXk8dkZcU5X6x-o18Qs405_a-kWaylUj1r3wJM/edit",
	" IBM":"https://docs.google.com/document/d/1uCab06hVJn_efpOTECOUIJ_lhAXa9mQQy8gUBNwU-0k/edit",
	" Natural Search":"https://docs.google.com/document/d/1776ulxpmIzrHae8xKkmAcxF8R9GuVRhkCfFUE8Rr5AA/edit",
	" Non-retail feeds":"https://docs.google.com/document/d/1lyA4BTlybrQIqHlp0CBglJCIzWmewtKJAfAgaJsZJuc/edit",
	" Project Mercury":"https://docs.google.com/document/d/1pSvL2yFpt9wwEWN-vrIFkOJErAFb8wBIEGA9n9MW5J8/edit",
	" Tag Implementation":"https://docs.google.com/document/d/1Q4KNwEeA0jvNYvyjjLyI1lN-6ymfqhoxdQ-FH8KNBuQ/edit",
	" Third Party Integration":"https://docs.google.com/document/d/15kMMOxSMwh4cZUn4BRgWjHVyjV31Nr1X7pBki-H_ioY/edit",
	" Whitelist Feature Implementation":"No Data Found"
};

//Test Object//

//Object/////
var testObject={
	" Cloud Storage API (DT, Entity, Scheduled Report download)":[
		{
			"1":"https://docs.google.com/document/d/1kDuI74BbkI2QHRBcxBcYUVi9IeBe0QNif0AGMxL-QC0/edit",
			"2":"https://docs.google.com/document/d/12gsX3S2F-qdWx8MfpzmrRtLEL02kVNX8kFixQVYrSzE/edit"
		}],
	" DMP API (Private DMP Integrations)" :[
		{
			"1":"https://docs.google.com/document/d/1FYYV-CJm67oxVeasq0czCuZy9xBAq-3FhMrpnDWM6fI/edit",
			"2":"https://docs.google.com/document/d/1q4kpXBK_U7A-rx7GmxsFLc-rgJToSiS2xDapBi6qJ30/edit"
		}],
	" Reporting API (Scheduled Report creation)":[
		{
			"1":"https://cs.corp.google.com/piper///depot/google3/experimental/users/dcleveland/dbm_api/README",
			"2":"https://docs.google.com/document/d/1-PMgYl3Ip8HGvr7W6ClnokscjMbdAKhpBH-76gguAUs/edit"
		}],
	" Brand Lift":[
		{
			"1":"https://docs.google.com/document/d/1GUAu-um9Jc_Bt25EecdP2laHqn1Z4KyMUWE59vnOMgw/edit",
			"2":"https://docs.google.com/document/d/1kG96h3Kvh1KaEIW3D508jl9foB3zNbpfUwHCzVVCozo/edit"
		}],
	" DCM Full-to-Hybrid Transition":[
		{
			"1":"https://docs.google.com/document/d/1bMlDyz5VzcrrJA2wVgkKYR9DPvU8ZFvKWC6AmdHw0SA/edit",
			"2":"https://docs.google.com/document/d/1zWwFNpQJLwSJ043Eq-GIvy_Lp3XuymgF9m3wwArL5Z4/edit"
		}],
	" Native Ads":[
		{
			"1":"https://docs.google.com/document/d/1IBy0mFwNcfLB2EnF-1iAsj4GDY9FA4JLONQey--fI7E/edit",
			"2":"https://docs.google.com/document/d/1R9Z8UutRf4KsO3VMBbHGwnQHhuKJaURH9OabmCO3hgk/edit"
		}],
	" Programmatic Guaranteed (Jordan)": [
		{
			"1":"https://docs.google.com/document/d/1WNvIQAIakMO_18Tfvdd6dlKIej6haxb662ncVry4TUY/edit",
			"2":"https://docs.google.com/document/d/1M8MOTbqQp6AwMB-DtkQOnlxxWy5D7LQrlm0COwAbdxU/edit"
		}],
	" Programmatic Guaranteed Video (Petra)": [
		{
			"1":"https://docs.google.com/document/d/1i-lIPu65s4mJ3ceUjsMKwJ8V1DC0Ree7FbSDoWzScZU/edit",
			"2":"https://docs.google.com/document/d/1VNg2cyTx9U9jMw0C3mNY6dN5s_593KnAxpDRW97iSXU/edit"
		}],
	" Tag Guaranteed (Crumbs)":[
		{
			"1":"https://docs.google.com/document/d/17NkkgiCX8b_7uwU8ggMso7V5FY7QKERJykwwPrnGneI/edit",
			"2":"https://docs.google.com/document/d/1SrYof_NXB5OIxfqesGXzZ838WA7eSBKLSktMTBx8p2E/edit"
		}],
	" 3rd Party Ads and Technologies":[
		{
			"1":"https://drive.google.com/a/google.com/folderview?id=0B2rLEVd6a2fIZHN3M1VzVS1kdmM&usp=sharing",
			"2":"https://docs.google.com/document/d/1Gcgaxh9T0C2ReuzZqdzMRzegyH1f3TDd_GidaA77So0/edit"
		}],
	" DCM Creatives": [
		{
			"1":"https://support.google.com/adsihc/topic/6310530?hl=en&ref_topic=6297911",
			"2":"https://docs.google.com/document/d/1qnNyMRxayj9ZzEOciIjkLJsKvOeUvBuG_8SGpabRx9E/edit"
		}],
	" DRM Creatives": [
		{
			"1":"https://docs.google.com/presentation/d/1Td2qCnaKqaqu9CMtyKxvzI3uj4tcikrcgs5jmPiJnfM/edit#slide=id.g98067edd6_0_1249",
			"2":"https://docs.google.com/document/d/11X0hjEFP6w0UOOtdfLqWpYdYITc3MV_No0mkqbE816U/edit"
		}],
	" Dynamic in DBM": [
		{
			"1":"https://docs.google.com/presentation/d/1Td2qCnaKqaqu9CMtyKxvzI3uj4tcikrcgs5jmPiJnfM/edit#slide=id.g98067edd6_0_1249",
			"2":"https://docs.google.com/document/d/1Xy8kDTxYYhywXVZSCkE_NpauLWp0m1ZCNGhgXPMiZLA/edit"
		}],
	" SCUP/DIGIT": [
		{
			"1":"https://docs.google.com/a/google.com/forms/d/1wpj0iZk8GX_2hHTXlqrm_nXE83C9Uc9jfaNL6YAd0EE/viewform",
			"2":"https://support.google.com/adsihc/answer/6323107?hl=en"
		}],
	" App Promo Campaign":[
		{
			"1":"https://docs.google.com/document/d/1HqK1EXiRJb-KEAW03Ozi5PSvJ7t5dwqgYkMUyWkSTBA/edit",
			"2":"https://docs.google.com/document/d/1_m1MITWF1w0RWCKvFqzbYYsey6S__NJvTs9cbexpfBs/edit"
		}],
	" Local 3rd Party App Tracker Integration":[
		{
			"1":"https://docs.google.com/document/d/1gQXb7TAdyYT6XDVaFC9GrjyWCK5UPkNZLyi5v9x479Y/edit",
			"2":"https://docs.google.com/document/d/10Er9qyvXbIqWihSJEd0akBkwBlnD3jMNyBRXfeCW6eE/edit"
		}],
	" 3PAS Creative Work (Dynam-o)": [
		{
			"1":"https://docs.google.com/document/d/1IngPyShQmr0kK27F3XkqCcU6Mv5R7NIXFGnTJ_0tpEI/edit",
			"2":"https://docs.google.com/document/d/1IngPyShQmr0kK27F3XkqCcU6Mv5R7NIXFGnTJ_0tpEI/edit"
		}],
	" Ad Verification (Dynam-o)":[
		{
			"1":"https://support.google.com/adsihc/answer/3271318?hl=en",
			"2":"https://sites.google.com/a/google.com/dps/ds3/2/ga-integration"
		}],
	" API/DT Setup (Dynam-o)":[
		{
			"1":"https://docs.google.com/document/d/1kDuI74BbkI2QHRBcxBcYUVi9IeBe0QNif0AGMxL-QC0/edit",
			"2":"https://docs.google.com/document/d/12gsX3S2F-qdWx8MfpzmrRtLEL02kVNX8kFixQVYrSzE/edit"
		}],
	" Cross-product Non-DCM (Dynam-o)":[
		{
			"1":"https://support.google.com/adsihc/answer/6123820?hl=en",
			"2":"https://support.google.com/adsihc/answer/6123820?hl=en"
		}],
	" DCM Link (Dynam-o)":[
		{
			"1":"https://support.google.com/bidmanager/answer/3155819?hl=en",
			"2":"https://support.google.com/bidmanager/answer/6290653"
		}],
	" Deals (Dynam-o)":[
		{
			"1":"https://docs.google.com/document/d/1Xhl4vSAO3SiY7x9OqW_TrdMzRfCtS_0y__Ec7K34LhA/edit",
			"2":"https://docs.google.com/document/d/1mKliUbtz5b2Dw0bubU_IaU-rI1xm9EJ3RSSeoNkf7B0/edit"
		}],
	" DMP Integration (Dynam-o)":[
		{
			"1":"https://support.google.com/adsihc/answer/6202976?hl=en&ref_topic=6222581&vid=1-635808829612035174-201297944",
			"2":"https://docs.google.com/document/d/1Te6WcS1gsGfxDO1D8qhwARofFYvTMpUx0mZ3KBKl0ow/edit"
		}],
	" Exchange Seats (Dynam-o)":[
		{
			"1":"https://sites.google.com/a/google.com/invite---platform/list-of-how-to-s/admin/partners/-partner-creation/bidder-pilot",
			"2":"https://docs.google.com/document/d/1v06YI8xk1JSGimV4R-JnKISsbuOWCBVGq9sQh9YQW6c/edit"
		}],
	" Generate Logins (Dynam-o)":[
		{
			"1":"https://support.google.com/bidmanager/answer/4448365",
			"2":"https://docs.google.com/document/d/1DX3gBMB_xrr6rebsq8dDp70hOxT__ymn1U8f-kPEBP0/edit"
		}],
	" Other (Dynam-o)":[
		{
			"1":"No Documentation Available",
			"2":"No Documentation Available"
		}],
	" Proactive Troubleshooting (Dynam-o)":[
		{
			"1":"No Documentation Available",
			"2":"No Documentation Available"
		}],
	" Spend Tracker":[
		{
			"1":"https://docs.google.com/document/d/1BglMqjZKOBNC7A7jDIn0Z3wZpVUfwCoWyuIsfNZflYk/edit",
			"2":"https://docs.google.com/document/d/1muX7Ei42_y1v78qZ4MwyIr6DzretmMPMf_f6_8J0Cxw/edit"
		}],
	" DBM Account Implementation (Non Dynamo-o)":[
		{
			"1":"https://docs.google.com/document/d/1_w8AApV_w2tFaHkWv8oZxWkRoeoE7vhOVwwYImYHJ10/edit",
			"2":"https://docs.google.com/document/d/1_w8AApV_w2tFaHkWv8oZxWkRoeoE7vhOVwwYImYHJ10/edit"
		}],
	" Local Exchange Onboarding":[
		{
			"1":"https://sites.google.com/a/google.com/invite---platform/list-of-how-to-s/admin/partners/-partner-creation/bidder-pilot",
			"2":"https://docs.google.com/document/d/1v06YI8xk1JSGimV4R-JnKISsbuOWCBVGq9sQh9YQW6c/edit"
		}],
	" dealsPro": [
		{
			"1":"Not Available in LATAM",
			"2":"Not Available in LATAM"
		}],
	" Programmatic Direct (non- dealsPro)":[
		{
			"1":"No Documentation Available",
			"2":"No Documentation Available"
		}],
	" Video Campaign":[
		{
			"1":"No Documentation Available",
			"2":"No Documentation Available"
		}],
	" New CI Account Implementation":[
		{
			"1":"No Documentation Available",
			"2":"No Documentation Available"
		}],
	" New DS Account Onboarding":[
		{
			"1":"https://docs.google.com/presentation/d/14oHmoNpj5u3lJQPnCs1k9buQyn8rH5RHMLJphqFjFPw/edit#slide=id.ge6ce75931_0_1040",
			"2":"https://docs.google.com/document/d/18t3mbiP6ulDzp75wvM50mYbOivq4rBYEo3E5A75xRJI/edit"
		}],
	" Bid Strategy":[
		{
			"1":"https://docs.google.com/document/d/1LH-DP-ydy-RKw8Cqxfore2MsZ2pD3yW05_tRUK79B2o/edit",
			"2":"https://docs.google.com/document/d/1fyRYNR-rXX8qV0c12cYRNUHxZq-dQ0axjEO3j-xy1zA/edit"
		}],
	" Google Analytics":[
		{
			"1":"https://docs.google.com/document/d/1_AU6_Fe2B17i-gmcZOks8Isc1AS7VR9Yts9DJn53_Co/edit",
			"2":"https://docs.google.com/document/d/1A_JqTdXk8dkZcU5X6x-o18Qs405_a-kWaylUj1r3wJM/edit"
		}],
	" IBM":[
		{
			"1":"https://support.google.com/ds/answer/6115264?hl=en&ref_topic=6115278",
			"2":"https://docs.google.com/document/d/1uCab06hVJn_efpOTECOUIJ_lhAXa9mQQy8gUBNwU-0k/edit"
			
		}],
	" Natural Search":[
		{
			"1":"https://support.google.com/ds/answer/2389724?hl=en",
			"2":"https://docs.google.com/document/d/1776ulxpmIzrHae8xKkmAcxF8R9GuVRhkCfFUE8Rr5AA/edit"
		}],
	" Non-retail feeds":[
		{
			"1":"https://docs.google.com/document/d/1RDPbW4xs21-nXgB6HaeoKlzhXZPi6lWhMT_TuM92M4s/edit",
			"2":"https://docs.google.com/document/d/1lyA4BTlybrQIqHlp0CBglJCIzWmewtKJAfAgaJsZJuc/edit"
		}],
	" Project Mercury":[
		{
			"1":"https://sites.google.com/a/google.com/mercury-assets/best-practices-tools",
			"2":"https://docs.google.com/document/d/1pSvL2yFpt9wwEWN-vrIFkOJErAFb8wBIEGA9n9MW5J8/edit"
		}],
	" Tag Implementation":[
		{
			"1":"https://docs.google.com/document/d/1mTP_6-9Bm_WqVBFLjeV9F4gPXrWxywYjFvYwXOHUrDA/edit",
			"2":"https://docs.google.com/document/d/1Q4KNwEeA0jvNYvyjjLyI1lN-6ymfqhoxdQ-FH8KNBuQ/edit"
		}],
	" Third Party Integration":[
		{
			"1":"https://support.google.com/adsihc/answer/6170913?hl=en",
			"2":"https://docs.google.com/document/d/15kMMOxSMwh4cZUn4BRgWjHVyjV31Nr1X7pBki-H_ioY/edit"
		}],
	" Whitelist Feature Implementation":[
		{
			"1":"No Data Found",
			"2":"No Data Found"
		}],
	" 3PAS":[
		{
				"1":"https://support.google.com/dcm/answer/2826428?hl=en",
				"2":"https://docs.google.com/document/d/1borcQWG8QNh3fAFos-zXPj-dpdchKi5B8jj689EtZlc/edit"
		}],
	" AdWords/GDN":[
		{
				"1":"https://docs.google.com/document/d/1QALyFO6mMvrMabmPHwR4CO4-d0VUByXzOuVZZcIKurs/edit",
				"2":"https://docs.google.com/document/d/16xy_0cLh1-d2cPGz6KREZBKXbWJOPoopZZ3nQUcwwus/edit"
		}],
	" DBM":[
			{
				"1":"https://support.google.com/bidmanager/answer/3155819",
				"2":"https://support.google.com/bidmanager/answer/6290653"
			}],
	" DFP/XFP":[
			{
				"1":"https://support.google.com/dcm/answer/6055507?hl=en/storage.googleapis.com/diesel/dcm/eLearning_videos/Video07.swf",
				"2":"https://docs.google.com/document/d/1hke1sntkfH1rVrnE6lChCLrI4CNKt9ATeb6JtDEUhmc/edit"
			}],
	" DRM":[
			{
				"1":"https://support.google.com/dcm/answer/2785589?hl=en",
				"2":"https://docs.google.com/document/d/13dbDRdScl4i9bB_bR9Fw829vxDSa4XPNiLynRSzHmm0/edit"
			}],
    " DS":[
			{
				"1":"https://docs.google.com/document/d/1VYOb2A8oPch02YWHA6sK8Zq4VW-dQwI9Lm67Wlr3YlM/edit",
				"2":"https://docs.google.com/a/google.com/document/d/1jrR2QmVIsOVRhI_ZUSs15ZgTGi0bPESa_CwpSaRiJkU/edit?usp=sharing"
			}],
	" GAP":[
		    {
			    "1":"https://support.google.com/analytics/answer/3374230?hl=en",
				"2":"https://docs.google.com/document/d/1QOt9_3VCxY5cG8FqKiiuS7HIku4tzwxvf1LUXkwP62I/edit"
			}],
	" Audience Lists Creation/Sharing":[
			{
				"1":"https://docs.google.com/a/google.com/document/d/1sKl7vMOESE50EsPrh-iXY8bdE_pwQhFj_tR1YCj94cc/edit?usp=sharing",
			    "2":"https://docs.google.com/a/google.com/document/d/1t4LLYNesMxMLwj_2hH2IiiFsbym9kvceJzTnupjHOoo/edit?usp=sharing"
			}],
	" DCM Onboarding":[
			{
				"1":"https://docs.google.com/a/google.com/document/d/1PZneXbm_x6prT8mYwmYCCC3ezk8C8s-6ePHGMbr8H74/edit?usp=sharing",
			    "2":"https://docs.google.com/a/google.com/document/d/1peMQoH3Qp9ZZo-onJWhw12a1FUvf2xaI4KXx90Dkevc/edit?usp=sharing"
			}],
	" Data Transfer Activation":[
			{
				"1":"https://sites.google.com/a/google.com/dps/dcm/2/dt-activation#TOC-Services-Process",
				"2":"https://docs.google.com/a/google.com/document/d/1FbNt5-71lHVZOFLv4PcV9TZbKAI_fNDalTIjw1tIPn4/edit?usp=sharing"
			}],
	" Planning Implementation":[
			{
				"1":"https://support.google.com/dcm/answer/6025568?hl=en&ref_topic=6025547",
				"2":"https://docs.google.com/a/google.com/document/d/1X8_i6QYZP0mdQ5-UvxvnFz61CKoGGUGKZvG7eJbfdMs/edit?usp=sharing"
			}],
	" PLU Activation":[
			{
				"1":"https://sites.google.com/a/google.com/dps/dcm/2/plu#TOC-Services-Process",
				"2":"https://docs.google.com/a/google.com/document/d/1AVIi-h4WLupsnc148rf0QZx0mhY5lwDk1QAYWWZzzr8/edit?usp=sharing"
			}],
	" In-App Conversion Tracking Certification":[
			{
				"1":"https://support.google.com/dcm/answer/6373053?hl=en",
				"2":"https://docs.google.com/a/google.com/document/d/1AMZk44WS5psMjwTaOaw87m23oxlmpySxINOL3ODaZFI/edit?usp=sharing"
			}],
};


///Function Section///------------------------------------------------------------------->

//Chrome Notification Function//
function chromeNotificationCall()
{
    //Call function to find brief url in "clientObject". Url is stored in "briefUrl"//
    briefUrl=objectSweeper(implementationName, testObject);
	
    //Fire Chrome Notification if briefUrl is not undefined//
    if(briefUrl)
    {
   	 //Chrome Notification Object//
   	 var options= 
   	 {
   	 	type: "basic",
   	 	title: "Specialist 2.0 Version 2",
   	 	message: implementationName,
   	 	iconUrl:"icon.png",
   	 	buttons: [
			      {
   	 	            title: "Implementation Steps" ,
   	 	            iconUrl: "icon2.png"
				  },
				  {
   	 	            title: "Additional Resources" ,
   	 	            iconUrl: "icon2.png"
				  }  
			]

   	 }
	 
   	 //Chrome Notification Pop Up Creation//
   	 chrome.notifications.create('',options,function (notificationID, buttonIndex) {
   	 	console.log("pop up notification executed");
   	 	 });
	 
    }
    
}

// Finder Function to search inside Object//
function objectSweeper (find, object)
{
	keys=Object.keys(object);
	counter=0;
	implementationArray=[];
	
	while(counter<keys.length)
	{
		if(keys[counter]==find)
		{
			keyFound=keys[counter];
			implementationArray[0]=object[find][0][1];
			implementationArray[1]=object[find][0][2];
			console.log("Key Found in Object");
			console.log(keyFound);
			console.log("Url Implementation Found in Object");
			console.log(implementationArray[0]);
			return(implementationArray);
			break;
		}
		
		counter=counter+1;
	}
}
//////////////////////////////////////



//Communication Functions//

//Content Script//

//Message listener to check if Content Script has sent a message via Chrome Runtime API//
chrome.runtime.onMessageExternal.addListener( function(response, sender, sendResponse){

 //Debugging information on console//
 console.log("Message Received from contentScript");
 console.log(response); 
 implementationName=response;
 //Call Function //
 chromeNotificationCall();
 
 
 //Store extension "response" variable in chrome storage to use as validator//
 chrome.storage.local.set({"validator": response},function(){
	 console.log("response saved in local chrome storage");
 }); 

 //Listen to change of chrome storage local variable//
 chrome.storage.onChanged.addListener(function(changes, namespace)
 {
	 for (keys in changes)
	{	 
	var storageChange=changes[keys];
	console.log("new value");
	console.log(storageChange.newValue);
	console.log("old value");
	console.log(storageChange.oldValue);
	
	
   }
 });

 
});

//Server//
//MUST ADD SERVER COMMUNICATION//

//Function to encode client request from string format to utf-8 format///
 function encoderFunction(messageString) {
  var encoder = new TextEncoder('utf-8');
  return encoder.encode(messageString).buffer;
 }
 
//Function to decode server response from utf-8 format to string format//
 function decoderFunction(responseBuffer) {
  var dataView = new DataView(responseBuffer);
  var decoder = new TextDecoder('utf-8');
  return decoder.decode(dataView);
}

//Function that creates Socket //
function createSocket()
{
//chrome.sockets.tcp.create(properties ={}, callback function ="function (createInfo)")//
chrome.sockets.tcp.create({},function (createInfo) {
	console.log(createInfo.socketId);
    console.log("socket created");
    socketId=createInfo;
 });
}

//Function that connects to Server Socket//
function connectToSocket(socketIdentification)
{
	//chrome.sockets.tcp.connect.(socketId ="createInfo.socketId", address ="0.0.0.0", port ="9999", callback function ="function (result)")//
    chrome.sockets.tcp.connect(socketIdentification.socketId,"0.0.0.0", 8999, function (result) {
 	   		if (chrome.runtime.lastError)
			{
				//Error message with communication attempt//
 			   	console.log(chrome.runtime.lastError.message);
			}
  		  	else
			{ 	
				//"result" of connection attempt//
			    console.log(result);
				sendRequestToServer(requestMessage, socketIdentification.socketId);
			
			}
 		 });
	
}

//Function that sends request to Server//

function sendRequestToServer(requestMessage, socketIdentification)
{
	//chrome.sockets.tcp.send(socketId ="createInfo.socketId", arrayBufferData ="enconderFunction(request)", callback function ="function(sendInfo)")
	chrome.sockets.tcp.send(socketIdentification, encoderFunction(requestMessage), function (sendInfo) {
	   		console.log(sendInfo); });
}

//Server Event Listener//
chrome.sockets.tcp.onReceive.addListener(function (info) {
	if (info.data)
	{
		pythonServerResponse=decoderFunction(info.data);
		
    }
});

//Chrome Notifications Event Listeners//
chrome.notifications.onButtonClicked.addListener(function (notificationId,buttonIndex){

	 console.log("notification button clicked");
	 if(buttonIndex===0)
		{ 
			window.open(briefUrl[0]);
		} 
		
   	 if(buttonIndex===1)
   		{ 
   			window.open(briefUrl[1]);
   		} 
});	



/////////////////////////////////////////-------------------------------------------------->

//Main Section///------------------------------------------------------------------------------------>
//Set uo logic to call Server and obtain JSON Object//
socketId=createSocket();

if(socketId != null)
{
	connectToSocket(socketId.socketId);
	
}

//--------------------------------------------------------------------------------------------------->
