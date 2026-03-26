import type { Schema, Struct } from '@strapi/strapi';

export interface LivretBilanFinal extends Struct.ComponentSchema {
  collectionName: 'components_livret_bilan_finals';
  info: {
    displayName: 'Bilan Final';
    icon: 'file';
  };
  attributes: {
    appreciationReferent: Schema.Attribute.RichText;
    appreciationTuteur: Schema.Attribute.RichText;
    autoEvaluationApprenti: Schema.Attribute.RichText;
    decision: Schema.Attribute.Enumeration<
      ['Valid\u00E9', 'En cours de validation', '\u00C0 revoir']
    >;
    synthesePedagogique: Schema.Attribute.RichText;
  };
}

export interface LivretBlocCompetence extends Struct.ComponentSchema {
  collectionName: 'components_livret_bloc_competences';
  info: {
    displayName: 'Bloc de comp\u00E9tence';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LivretBlocCompetenceSuivi extends Struct.ComponentSchema {
  collectionName: 'components_livret_bloc_competence_suivis';
  info: {
    displayName: 'Suivi Comp\u00E9tence';
    icon: 'check';
  };
  attributes: {
    commentaireReferent: Schema.Attribute.RichText;
    commentaireTuteur: Schema.Attribute.RichText;
    competence: Schema.Attribute.String & Schema.Attribute.Required;
    niveauAtteint: Schema.Attribute.Enumeration<
      ['Non acquis', 'En cours', 'Acquis', 'Ma\u00EEtris\u00E9']
    >;
  };
}

export interface LivretInfosEntreprise extends Struct.ComponentSchema {
  collectionName: 'components_livret_infos_entreprises';
  info: {
    displayName: 'Infos Entreprise';
    icon: 'building';
  };
  attributes: {
    adresse: Schema.Attribute.Text;
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    tuteurEmail: Schema.Attribute.Email;
    tuteurFonction: Schema.Attribute.String;
    tuteurNom: Schema.Attribute.String & Schema.Attribute.Required;
    tuteurTelephone: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'livret.bilan-final': LivretBilanFinal;
      'livret.bloc-competence': LivretBlocCompetence;
      'livret.bloc-competence-suivi': LivretBlocCompetenceSuivi;
      'livret.infos-entreprise': LivretInfosEntreprise;
    }
  }
}
