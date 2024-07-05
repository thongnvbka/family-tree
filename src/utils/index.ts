import { FamilyTree } from '@/models/FamilyTree'
import { Member } from '@/models/Member'
import { Gender } from '@/types/Gender'

export const isMale = (member: Member): boolean => member.gender === Gender.MALE
export const isFemale = (member: Member): boolean =>
  member.gender === Gender.FEMALE

export const getName = (member: Member): string => member.name
export const getSpouse = (member: Member): Member | null => member.spouse

export const isMemberOrSpouse =
  (name: string) =>
  (member: Member): boolean =>
    member.name === name || member.spouse?.name === name

export const setupShanFamilyTree = (): FamilyTree => {
  //1st generation
  // const family = new FamilyTree('king shan', 'queen anga')
  const familyData = {
    members: [
      {
        name: 'king shan',
        spouse: 'queen anga',
        gender: 'MALE',
        children: ['ish', 'chit', 'vich', 'satya'],
      },
      {
        name: 'queen anga',
        gender: 'FEMALE',
        spouse: 'king shan',
        children: ['ish', 'chit', 'vich', 'satya'],
      },
      {
        name: 'ish',
        gender: 'MALE',
        parents: ['king shan', 'queen anga'],
      },
      {
        name: 'chit',
        gender: 'MALE',
        spouse: 'ambi',
        children: ['drita', 'vrita'],
        parents: ['king shan', 'queen anga'],
      },
      {
        name: 'ambi',
        gender: 'FEMALE',
        spouse: 'chit',
      },
      {
        name: 'vich',
        gender: 'MALE',
        spouse: 'lika',
        children: ['vila', 'chika'],
        parents: ['king shan', 'queen anga'],
      },
      {
        name: 'lika',
        gender: 'FEMALE',
        spouse: 'vich',
      },
      {
        name: 'satya',
        gender: 'FEMALE',
        spouse: 'vyan',
        children: ['satvy', 'savya', 'saayan'],
        parents: ['king shan', 'queen anga'],
      },
      {
        name: 'vyan',
        gender: 'MALE',
        spouse: 'satya',
      },
      {
        name: 'drita',
        gender: 'MALE',
        spouse: 'jaya',
        children: ['jata', 'driya'],
        parents: ['chit', 'ambi'],
      },
      {
        name: 'jaya',
        gender: 'FEMALE',
        spouse: 'drita',
      },
      {
        name: 'vrita',
        gender: 'MALE',
        parents: ['chit', 'ambi'],
      },
      {
        name: 'vila',
        gender: 'MALE',
        spouse: 'jnki',
        children: ['lavnya'],
        parents: ['vich', 'lika'],
      },
      {
        name: 'jnki',
        gender: 'FEMALE',
        spouse: 'vila',
      },
      {
        name: 'chika',
        gender: 'FEMALE',
        spouse: 'kpila',
        parents: ['vich', 'lika'],
      },
      {
        name: 'kpila',
        gender: 'MALE',
        spouse: 'chika',
      },
      {
        name: 'satvy',
        gender: 'FEMALE',
        spouse: 'asva',
        parents: ['satya', 'vyan'],
      },
      {
        name: 'asva',
        gender: 'MALE',
        spouse: 'satvy',
      },
      {
        name: 'savya',
        gender: 'MALE',
        spouse: 'krpi',
        children: ['kriya'],
        parents: ['satya', 'vyan'],
      },
      {
        name: 'krpi',
        gender: 'FEMALE',
        spouse: 'savya',
      },
      {
        name: 'saayan',
        gender: 'MALE',
        spouse: 'mina',
        children: ['misa'],
        parents: ['satya', 'vyan'],
      },
      {
        name: 'mina',
        gender: 'FEMALE',
        spouse: 'saayan',
      },
      {
        name: 'jata',
        gender: 'MALE',
        parents: ['drita', 'jaya'],
      },
      {
        name: 'driya',
        gender: 'FEMALE',
        spouse: 'mnu',
        parents: ['drita', 'jaya'],
      },
      {
        name: 'mnu',
        gender: 'MALE',
        spouse: 'driya',
      },
      {
        name: 'lavnya',
        gender: 'FEMALE',
        spouse: 'gru',
        parents: ['vila', 'jnki'],
      },
      {
        name: 'gru',
        gender: 'MALE',
        spouse: 'lavnya',
      },
      {
        name: 'kriya',
        gender: 'MALE',
        parents: ['savya', 'krpi'],
      },
      {
        name: 'misa',
        gender: 'MALE',
        parents: ['saayan', 'mina'],
      },
    ],
  }

  const family = new FamilyTree('king shan', 'queen anga')

  // Function to add members to the family tree
  function addMembersToFamilyTree(familyData: any, family: any) {
    // Track existing members to avoid duplicates
    const existingMembers = new Set(['king shan', 'queen anga'])

    // Add spouses first
    for (const member of familyData.members) {
      if (member.spouse && !existingMembers.has(member.spouse)) {
        family.addMember(member.name, member.spouse, member.gender, 'SPOUSE')
        existingMembers.add(member.spouse)
      }
    }

    // Add children
    for (const member of familyData.members) {
      if (member.children && member.children.length > 0) {
        for (const childName of member.children) {
          const child = familyData.members.find(
            (m: any) => m.name === childName,
          )
          const parentName = member.name
          if (!existingMembers.has(child.name)) {
            family.addMember(parentName, child.name, child.gender, 'CHILD')
            existingMembers.add(child.name)
          }
        }
      }
    }
  }

  // Add members to the family tree
  addMembersToFamilyTree(familyData, family)

  console.log(family)

  return family

  // 2nd generation
  // family.addMember('king shan', 'ish', Gender.MALE, 'CHILD')
  // family.addMember('king shan', 'chit', Gender.MALE, 'CHILD')
  // family.addMember('queen anga', 'vich', Gender.MALE, 'CHILD')
  // family.addMember('queen anga', 'satya', Gender.FEMALE, 'CHILD')

  // family.addMember('chit', 'ambi', Gender.FEMALE, 'SPOUSE')
  // family.addMember('vich', 'lika', Gender.FEMALE, 'SPOUSE')
  // family.addMember('satya', 'vyan', Gender.MALE, 'SPOUSE')

  // // 3rd generation
  // family.addMember('ambi', 'drita', Gender.MALE, 'CHILD')
  // family.addMember('ambi', 'vrita', Gender.MALE, 'CHILD')

  // family.addMember('lika', 'vila', Gender.MALE, 'CHILD')
  // family.addMember('lika', 'chika', Gender.FEMALE, 'CHILD')

  // family.addMember('satya', 'satvy', Gender.FEMALE, 'CHILD')
  // family.addMember('satya', 'savya', Gender.MALE, 'CHILD')
  // family.addMember('satya', 'saayan', Gender.MALE, 'CHILD')

  // family.addMember('drita', 'jaya', Gender.FEMALE, 'SPOUSE')
  // family.addMember('vila', 'jnki', Gender.FEMALE, 'SPOUSE')
  // family.addMember('chika', 'kpila', Gender.MALE, 'SPOUSE')
  // family.addMember('satvy', 'asva', Gender.MALE, 'SPOUSE')
  // family.addMember('savya', 'krpi', Gender.FEMALE, 'SPOUSE')
  // family.addMember('saayan', 'mina', Gender.FEMALE, 'SPOUSE')

  // /// 4th generation
  // family.addMember('jaya', 'jata', Gender.MALE, 'CHILD')
  // family.addMember('jaya', 'driya', Gender.FEMALE, 'CHILD')
  // family.addMember('jnki', 'lavnya', Gender.FEMALE, 'CHILD')
  // family.addMember('krpi', 'kriya', Gender.MALE, 'CHILD')
  // family.addMember('mina', 'misa', Gender.MALE, 'CHILD')

  // family.addMember('driya', 'mnu', Gender.MALE, 'SPOUSE')
  // family.addMember('lavnya', 'gru', Gender.MALE, 'SPOUSE')

  // return family
}
