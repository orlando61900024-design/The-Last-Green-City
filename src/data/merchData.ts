import { MerchandiseItem } from '../types/game';

export const MERCHANDISE_ITEMS: MerchandiseItem[] = [
  {
    id: 'pip_standee',
    name: 'Pip Explorer Acrylic Standee',
    tagline: 'Official Verdia Botanist Scout Desktop Mascot',
    pricePoints: 100,
    unlocked: true,
    type: 'standee',
    description: 'A charming 15cm laser-cut optical acrylic standee of Pip in his iconic camouflage leaf utility jumper, sturdy expedition boots, and trusty explorer pack. Features a weighted round base etched with the Verdia concentric biome emblem.',
    realWorldEcoPledge: 'Manufactured with 100% recycled post-consumer PMMA acrylic (Greencast) using zero-emission solar laser etching.',
    imageAlt: 'Acrylic standee of Pip with smiling face, spiky brown hair, and green utility jumper on white display base'
  },
  {
    id: 'terrarium_keychain',
    name: 'Micro-Biome Terrarium Keychain',
    tagline: 'A Miniature Forest Sanctuary In The Palm of Your Hand',
    pricePoints: 180,
    unlocked: false,
    type: 'keychain',
    description: 'An elegant sealed glass-flask pendant containing living biological moss, miniature dwarf bonsai sprout, fertile loam, and visible exposed root tendrils. Suspended from an antique brushed brass carabiner clip with a rotating swivel ring.',
    realWorldEcoPledge: 'Each keychain purchase directly funds the planting of 10 native acacia and mangrove trees along vulnerable coastal belts.',
    imageAlt: 'Glass bulb keychain containing a miniature living forest with green canopies and brown soil roots'
  },
  {
    id: 'eco_bucket_hat',
    name: 'Verdia Ranger Split-Tone Bucket Hat',
    tagline: 'Two-Tone Organic Cotton & Embroidered Heritage Tree Patch',
    pricePoints: 240,
    unlocked: false,
    type: 'hat',
    description: 'Hand-sewn dual-panel bucket hat featuring Verdia Sprout Green on one hemisphere and Terracotta Earth Orange on the other. Adorned with a circular woven tree crest badge and a woven eco-woven authenticity label along the brim.',
    realWorldEcoPledge: 'Woven from 100% GOTS-certified organic unbleached cotton, tinted with water-saving vegetable dyes (chlorophyll & turmeric).',
    imageAlt: 'Dual-tone green and orange bucket hat with circular tree emblem patch and stitched brim'
  },
  {
    id: 'field_guide_artbook',
    name: 'Verdia Field Guide & Character Turnaround',
    tagline: 'Concept Art, Character Blueprint Sheets & SDG Manual',
    pricePoints: 300,
    unlocked: false,
    type: 'book',
    description: 'A deluxe linen-bound 96-page field manual containing Pip’s complete front/back character turnaround sketches, Dr. Maya’s botanical field notes, blueprints for Verdia’s 17 SDG sectors, and watercolor studies of restored global biomes.',
    realWorldEcoPledge: 'Printed on 100% FSC-certified post-agricultural hemp and apple-skin paper using non-toxic algae inks.',
    imageAlt: 'Field guide showing Pip character turnaround front and back with backpack details'
  }
];
