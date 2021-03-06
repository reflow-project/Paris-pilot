import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react';
import classNames from 'classnames';
import useSWR from 'swr'
import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

import styles from "@styles/pages/Form.module.css";

import LabelProject from '@components/LabelProject';
import { Inputs } from '@components/Inputs';
import Layout from '@components/Layout'
import Tags from '@components/Tags';

import { getColors, seed } from '@libs/getColors';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function AddProject({ formOverrides }) {
    const [sending, setSending] = useState(false)
    const router = useRouter()

    const { data, error } = useSWR('/api/get/structures', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>


    let suppliersOptions = data.filter((el) => el.typologies.indexOf("stockage") >= 0).map((el) => ({ value: el.id, label: el.name }));
    let designersOptions = data.filter((el) => el.typologies.indexOf("designer") >= 0).map((el) => ({ value: el.id, label: el.name }));
    let workshopsOptions = data.filter((el) => el.typologies.indexOf("atelier") >= 0).map((el) => ({ value: el.id, label: el.name }));
    let othersOptions = data.filter((el) => el.typologies.indexOf("autre") >= 0).map((el) => ({ value: el.id, label: el.name }));



    const Form = [
        {
        name: "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix: "Nom",
        description: "Le nom de votre projet, objet, chantier...",
        suffix: "",
            required: true,
            group: "meta"
        },
    {
        name: "typology",
        schema: Yup.string().required('Requis'),
        type: "select",
        initial: "",
        placeholder: "",
        prefix: "Typologie",
        description: "La typologie de votre projet.",
        suffix: "",
        required: true,
        options: [
            {
                value: "objet",
                label: "Objet"
            },
            {
                value: "espace",
                label: "Espace"
            },
            {
                value: "mobilier",
                label: "Mobilier"
            }
        ],
        group: "meta"
    },
    {
        name: "description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "",
        placeholder: "Ce projet ...",
        prefix: "Description",
        description: "En une ou deux phrases, une pr??sentation de votre projet.",
        suffix: "",
        required: true,
        group: "meta"
    },
    {
        name: "team",
        schema: Yup.array().of(Yup.object().required('Requis')).required('Requis').nullable(),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        description: "Les noms des membres de l'??quipe.",
        prefix: "??quipe",
        suffix: "",
        required: true,
        options: [],
        group: "meta"
        },
        {
            name: "date",
            schema: Yup.string().required('Requis'),
            type: "date",
            initial: "",
            placeholder: "",
            prefix: "Date",
            description: "Date de fabrication ou livraison.",
            suffix: "",
            required: true,
            group: "meta"
        },
        {
            name: "duration",
            schema: Yup.number().required('Requis'),
            type: "number",
            initial: 0,
            placeholder: 0,
            prefix: "Dur??e",
            description: "Dur??e globale du projet.",
            suffix: "jours",
            required: true,
            group: "meta"
        },
    {
        name: "designers",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Designer.s",
        description: "Les structures qui ont port?? la conception.",
        suffix: "",
        required: false,
        options: designersOptions,
        group: "meta"
    },
    {
        name: "workshops",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Ateliers/lieux de fabrication",
        description: "Les structures qui ont port?? la fabrication.",
        suffix: "",
        required: false,
        options: workshopsOptions,
        group: "meta"
    },
    {
        name: "suppliers",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Ressourceries/fournisseurs",
        description: "Les structures qui ont fourni les mati??res premi??res.",
        suffix: "",
        required: false,
        options: suppliersOptions,
        group: "meta"
    },
    {
        name: "others",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Partenaires",
        description: "Les structures partenaires qui vous ont accompagn??s, institutions, incubateurs...",
        suffix: "",
        required: false,
        options: othersOptions,
        group: "meta"
    },
    {
        name: "contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact",
        description: "L'adresse mail d'un r??f??rent pour avoir plus d'informations. (Ne sera pas visible sur le site.)",
        suffix: "",
        required: true,
        group: "meta"
    },
    {
        name: "website",
        schema: Yup.string().url("Url incorrecte, pensez ?? ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "siteduprojet.org",
        prefix: "Documentation",
        description: "L'url de votre site internet ou de la documentation si elle existe.",
        suffix: ""
    },
    {
        name: "illustrations",
        schema: Yup.array().of(Yup.string().url()).nullable(),
        type: "images",
        initial: [],
        placeholder: "",
        prefix: "Illustrations",
        description: "Une ou plusieurs images pour illustrer votre structure.",
        suffix: "",
        group: "meta"
    },
    {
        name: "colors",
        schema: Yup.array().of(Yup.string()),
        type: "button",
        initial: getColors(seed()),
        placeholder: "",
        prefix: "Changer les couleurs",
        suffix: "",
        required: true,
        handler: [getColors, seed],
        group: "customize"
        },
        {
            name: "material_source",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Source des materiaux",
            description: "La source de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "fournisseur traditionnel",
                    label: "Fournisseur Traditionnel"
                },
                {
                    value: "fournisseur responsable",
                    label: "Fournisseur Responsable"
                },
                {
                    value: "ressourcerie",
                    label: "Ressourcerie"
                },
                {
                    value: "gisement local",
                    label: "Gisement Local"
                }
            ],
            group: "material"
        },
        {
            name: "material_quality",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Qualit?? des materiaux",
            description: "La qualit?? de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "n/a",
                    label: "n/a"
                },
                {
                    value: "certifie",
                    label: "Certifi??"
                },
                {
                    value: "naturel",
                    label: "Naturel"
                },
                {
                    value: "traitement responsable",
                    label: "Traitement Responsable"
                }
            ],
            group: "material"
        },
        {
            name: "material_leftovers",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Gestion des chutes",
            description: "La mani??re dont les chutes du projet sont trait??es.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "don",
                    label: "Don"
                },
                {
                    value: "recyclage",
                    label: "Recyclage"
                },
                {
                    value: "chutes minimales",
                    label: "Chutes minimes"
                },
                {
                    value: "referencement",
                    label: "R??f??rencement"
                },
                {
                    value: "aucune",
                    label: "Aucune gestion"
                }
            ],
            group: "material"
        },
        {
            name: "material_origin",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Origine des materiaux",
            description: "L'origine g??ographique de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "sur place",
                    label: "Sur place"
                },
                {
                    value: "commune",
                    label: "Commune"
                },
                {
                    value: "pays",
                    label: "Pays"
                },
                {
                    value: "monde",
                    label: "Monde"
                }
            ],
            group: "material"
        },
        {
            name: "design_replicability",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "R??plicabilit?? de la conception",
            description: "La capacit?? ?? r??utiliser le design de votre production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "piece unique",
                    label: "Pi??ce Unique"
                },
                {
                    value: "produit replicable",
                    label: "Produit replicable"
                },
                {
                    value: "modele parametrique",
                    label: "Mod??le param??trique"
                }
            ],
            group: "design"
        },
        {
            name: "design_sharable",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Conception contributive",
            description: "La capacit?? de votre design ?? ??tre contributif.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "proprietaire",
                    label: "Design propri??taire"
                },
                {
                    value: "partage",
                    label: "Design partag??"
                },
                {
                    value: "modifiable",
                    label: "Design contributif"
                }
            ],
            group: "design"
        },
        {
            name: "design_reparable",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Design r??parable",
            description: "La capacit?? de votre produit ?? ??tre r??par??.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "personnel",
                    label: "R??parable par chacun"
                },
                {
                    value: "expert",
                    label: "R??parable par un expert"
                },
                {
                    value: "createur",
                    label: "R??parable par le cr??ateur"
                }
            ],
            group: "design"
        },
        {
            name: "design_durability",
            schema: Yup.array().of(Yup.string().required('Requis')),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Durabilit?? du design",
            description: "La capacit?? du design a ??tre durable.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "demontable",
                    label: "D??montable"
                },
                {
                    value: "stockable",
                    label: "Stockable"
                },
                {
                    value: "reutilisable",
                    label: "R??utilisable"
                }
            ],
            group: "design"
        },
        {
            name: "fab_expertise",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Savoir-faire",
            description: "Les savoir-faire que le projet mets en valeur.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "plusieurs",
                    label: "Plusieurs savoir-faire"
                },
                {
                    value: "peu",
                    label: "Peu de savoir-faire"
                },
                {
                    value: "aucun",
                    label: "Aucun savoir-faire"
                }
            ],
            group: "fab"
        },
        {
            name: "fab_local",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Proximit?? de la production",
            description: "La localisation de la production par rapport ?? l'utilisation.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "sur place",
                    label: "Sur place"
                },
                {
                    value: "commune",
                    label: "Commune"
                },
                {
                    value: "pays",
                    label: "Pays"
                },
                {
                    value: "monde",
                    label: "Monde"
                }
            ],
            group: "fab"
        },
        {
            name: "fab_tools",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Sp??cificit?? des outils",
            description: "La complexit?? des outils n??c??ssaire ?? la production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "outils standards",
                    label: "Outils standards"
                },
                {
                    value: "machines cnc",
                    label: "Machines ?? commandes num??riques"
                },
                {
                    value: "outillage specifique",
                    label: "Outillage sp??cifiques"
                }
            ],
            group: "fab"
        },
        {
            name: "fab_social",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Impact de la fabrication",
            description: "Impact social de la production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "reinsertion",
                    label: "R??insertion sociale"
                },
                {
                    value: "artisanat",
                    label: "Soutien ?? l'artisanat"
                },
                {
                    value: "aucun",
                    label: "Aucun"
                }
            ],
            group: "fab"
        },
        {
            name: "rgpd",
            schema: Yup.boolean().oneOf([true], 'Vous devez accepter la clause RGPD').required('Requis'),
            type: "checkbox",
            initial: "",
            placeholder: "",
            prefix: "Avertissement donn??es personnelles.",
            description: "Les informations demand??es sont utilis??es pour le fonctionnement du site et le r??ferencement des projets et peuvent donner lieu ?? exercice du droit individuel d???acc??s aupr??s des gestionnaire dans les conditions pr??vues par la loi. Elles ne seront ni c??d??es ni diffus??es en dehors des donn??es pr??sentes sur la plateforme.",
            suffix: "J'accepte ces conditions",
            required: true,
            group: "rgpd"
        }
    ]
    let Schema = {} ; Form.forEach((el) => { Schema[el.name] = el.schema })
    let initialValues = {};  Form.forEach((el) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        setSending(true)

        let data = new Object;
        Object.assign(data, fields)
        data.team = fields.team.map((el) => el.value)
        data.illustrations = data.illustrations.map(el => ({ "url": el }))
        let newStructures = Array.from(new Set([
            ...fields.designers.filter((el) => el.__isNew__).map((el) => (el.label)),
            ...fields.workshops.filter((el) => el.__isNew__).map((el) => (el.label)),
            ...fields.suppliers.filter((el) => el.__isNew__).map((el) => (el.label))
        ])).map((el) => ({ name: el }))

        if (newStructures.length > 0) {

            let newStructuresId = await fetch('/api/create/structures', { method: 'POST', body: JSON.stringify(newStructures), headers: { 'Content-Type': 'application/json' } })
            newStructuresId = await newStructuresId.json()
            data.designers = data.designers.map((designers) => {
                if (!designers.__isNew__) return designers.value
                let structure = newStructuresId.filter((structure) => structure.fields.name === designers.label)
                return structure[0].id
            });
            data.workshops = data.workshops.map((workshops) => {
                if (!workshops.__isNew__) return workshops.value
                let structure = newStructuresId.filter((structure) => structure.fields.name === workshops.label)
                return structure[0].id
            });
            data.suppliers = data.suppliers.map((suppliers) => {
                if (!suppliers.__isNew__) return suppliers.value
                let structure = newStructuresId.filter((structure) => structure.fields.name === suppliers.label)
                return structure[0].id
            });

        }
        let record = await fetch('/api/create/projects', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        record = await record.json()
        console.log(record);
        // setTimeout(()=>{formik.setSubmitting(false); console.log("timeout");}, 1000)
        router.push(`/projects/${record[0].id}`);

    }
    return (
        <Layout
            meta={{
                title: 'Labeliser un projet',
                description: "Remplissez le formulaire afin de labeliser votre projet.",
                image: "/assets/logo.png"
            }}
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={(values, formik) => { submit(values, formik) }}>
                {(props) => {
                    return (

                        
                        
                        <div className={styles.form}>

                            <Confetti 
                                style={{ 
                                    pointerEvents: 'none', 
                                    zIndex: 20,
                                    position: "fixed",
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    pointerEvents: "none",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%" }}
                                colors={props.values.colors}
                                numberOfPieces={sending ? 500 : 0}
                            />

                            <form className={classNames(styles.values, { [`${styles.submitted}`]: sending })} onSubmit={props.handleSubmit}>
                                {sending && <div className={styles.sending}><h3>C'est envoy??</h3>
                                </div>}
                                <h2>Pr??sentation du projet</h2>
                                <div>
                                    {Form.filter(el => el.group === "meta").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <h3>Les mat??riaux</h3>
                                <div>
                                    {Form.filter(el => el.group === "material").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <h3>La conception</h3>
                                <div>
                                    {Form.filter(el => el.group === "design").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <h3>La fabrication</h3>
                                <div>
                                    {Form.filter(el => el.group === "fab").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {Form.filter(el => el.group === "customize").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {Form.filter(el => el.group === "rgpd").map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <button
                                    type={"submit"}
                                    className={classNames(styles.submit)}
                                    onSubmit={props.handleSubmit}
                                >{props.isValidating ? "V??rification du formulaire" : "Envoyer"}</button>
                            </form>
                            <div className={styles.visualisation}>

                                <div className={styles.label}>
                                    <LabelProject
                                        project={{
                                            name: props.values.name,
                                            date: props.values.date,
                                            team: props.values.team.map((el)=>el.value),
                                            workshops: props.values.workshops.map((el) => el.value),
                                            designers: props.values.designers.map((el) => el.value),
                                            suppliers: props.values.suppliers.map((el) => el.value),
                                            others: props.values.others.map((el) => el.value),
                                            colors: props.values.colors,
                                            fab_expertise : props.values.fab_expertise,
                                            fab_local : props.values.fab_local,
                                            fab_social : props.values.fab_social,
                                            fab_tools : props.values.fab_tools,
                                            material_origin : props.values.material_origin,
                                            material_leftovers : props.values.material_leftovers,
                                            material_source : props.values.material_source,
                                            material_quality : props.values.material_quality,
                                            design_durability : props.values.design_durability,
                                            design_reparable : props.values.design_reparable,
                                            design_replicability : props.values.design_replicability,
                                            design_sharable : props.values.design_sharable 

                                        }}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    {props.values.illustrations.length > 0 && <img className={styles.illustration} src={props.values.illustrations[0]}/>}
                                    {props.values.name && <h2 className={styles.name}>{props.values.name}</h2> }
                                    {props.values.typology &&  <Tags className={styles.tags} tags={[props.values.typology]} />}
                                    {props.values.description && <p className={styles.description}>{props.values.description}</p>}
                                    {props.values.website &&<p className={classNames("link", styles.link)}>
                                        <Link href={{ pathname: props.values.website }}> Voir le site</Link>
                                    </p>}
                                </div>
                                <div className={styles.explainer}>
                                    <h3>Comprendre ce label</h3>
                                    <p>Ce label illustre les initiatives eco-responsables du projet. En compl??ment du certificat il permet de notifier votre d??mache et en donner un aper??u.</p>
                                    <p>Chacun des noeuds repr??sente un partenaire du projet que vous avez r??ussi ?? impliquer.</p>
                                    <p>Les proportions des diff??rentes couleurs repr??sentent chacun de vos engagements :</p>
                                    <ul className={styles.legends}>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[1] }}></span>Repr??sente votre engagement en terme de conception ouverte et perenne.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[2] }}></span>Repr??sente votre engagement d'un point de vue fabrication localis??e, et circuits courts.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[0] }}></span>Repr??sente votre engament en terme de mat??riaux responsables.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </Layout>
    );
}
