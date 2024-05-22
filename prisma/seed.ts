import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
    {
      "name": "Sara Carpenter",
      "email": "barnesbrandy@stewart.com",
      "phone": "+3807134936183",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Sharon Griffin",
      "email": "nathanielmartin@sellers.com",
      "phone": "+3808776945314",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Mr. Phillip Bennett",
      "email": "williamdavis@callahan.com",
      "phone": "+3804989413435",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Sheila Pollard",
      "email": "robertramirez@gmail.com",
      "phone": "+3801545168087",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "James Chase",
      "email": "jonesjason@yahoo.com",
      "phone": "+3800143634957",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "Evan Kennedy",
      "email": "nicole35@moore-bass.com",
      "phone": "+3809650752735",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "Jane Mcneil",
      "email": "brian97@calhoun.net",
      "phone": "+3803676320163",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Marissa Hernandez",
      "email": "wcabrera@cannon.net",
      "phone": "+3800546688937",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Beth Sanford",
      "email": "zimmermanbrian@whitehead.com",
      "phone": "+3805067165726",
      "photo": "",
      "position_id": 4
    },
    {
      "name": "Brian Kirk",
      "email": "sarah12@wilson-rodriguez.net",
      "phone": "+3805655125674",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Thomas Smith",
      "email": "lrobinson@pacheco-smith.com",
      "phone": "+3809324808613",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Seth Booker",
      "email": "fjohnson@hall.com",
      "phone": "+3809577738721",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Richard Baker",
      "email": "arnoldmaria@hotmail.com",
      "phone": "+3800490278742",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "Jennifer Miller",
      "email": "pfoster@thomas-taylor.net",
      "phone": "+3806658760366",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "Michael Ferguson",
      "email": "chapmanjerry@gmail.com",
      "phone": "+3805014294019",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Victor Vaughn",
      "email": "zchandler@wright.net",
      "phone": "+3804345581223",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Eric Kidd",
      "email": "frazierdanny@hotmail.com",
      "phone": "+3806629946804",
      "photo": "",
      "position_id": 4
    },
    {
      "name": "Ashley James",
      "email": "teresa28@harrell.net",
      "phone": "+3805331586923",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Edward Lyons",
      "email": "jason41@hotmail.com",
      "phone": "+3809816934060",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Ronald Foster",
      "email": "joshua35@gmail.com",
      "phone": "+3805977034824",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Sean Osborne",
      "email": "allison96@hickman.com",
      "phone": "+3808214658404",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Susan Mcgee",
      "email": "randy47@hickman-walls.com",
      "phone": "+3806400524278",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Stephanie Parsons",
      "email": "trujillorichard@clark.com",
      "phone": "+3801343320037",
      "photo": "",
      "position_id": 4
    },
    {
      "name": "Robert Robinson",
      "email": "juan35@watts.net",
      "phone": "+3801280598262",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "David Campos",
      "email": "pcarney@yahoo.com",
      "phone": "+3805744431351",
      "photo": "",
      "position_id": 4
    },
    {
      "name": "Melanie Taylor",
      "email": "elizabeth38@cummings.org",
      "phone": "+3809912419049",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Mark Williams",
      "email": "zhurst@yahoo.com",
      "phone": "+3804641708053",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Amanda Diaz",
      "email": "caseyjones@powell.com",
      "phone": "+3805951484656",
      "photo": "",
      "position_id": 3
    },
    {
      "name": "Theodore Murphy",
      "email": "kristenaguirre@gmail.com",
      "phone": "+3808317278895",
      "photo": "",
      "position_id": 2
    },
    {
      "name": "Curtis Buchanan",
      "email": "daniel62@yahoo.com",
      "phone": "+3800656272980",
      "photo": "",
      "position_id": 1
    },
    {
      "name": "Holly Shaw",
      "email": "uhorton@hotmail.com",
      "phone": "+3809314919058",
      "photo": "",
      "position_id": 1
    }
];

const positions = [
    {
        name: 'Tester',
    },
    {
        name: 'Developer',
    },
    {
        name: 'Manager',
    },
];

const main = async() => {
    for(const position of positions) {
        await prisma.position.create({
            data: {
                name: position.name,
            },
        });
    };
    for(const user of users) {
        await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                positionId: user.position_id,
                photo: 'avatar.jpg',
            }
        });
    };
};

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
});
