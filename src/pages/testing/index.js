import Test from "@/components/Test2/Test2"

export default function Home() {
  const lineageData = [
    {
      nodes: [
        {
          name: "Adam",
          gender: "male",
          color: "blue",
          mate: {
            name: "Eve",
            gender: "female",
            color: "pink"
          }
        }
      ]
    },
    {
      nodes: [
        {
          name: "Cain",
          gender: "male",
          color: "blue",
          mate: {
            name: "Luluwa",
            gender: "female",
            color: "pink"
          }
        },
        {
          name: "Abel",
          gender: "male",
          color: "green",
        }
      ]
    },
    {
      nodes: [
        {
          name: "Enoch",
          gender: "male",
          color: "blue"
        },
        {
          name: "Irad",
          gender: "male",
          color: "blue",
          mate: {
            name: "Adah",
            gender: "female",
            color: "pink"
          }
        },
        {
          name: "Mehujael",
          gender: "male",
          color: "green",
          mate: {
            name: "Zillah",
            gender: "female",
            color: "yellow"
          }
        }
      ]
    },
    {
      nodes: [
        {
          name: "Methusael",
          gender: "male",
          color: "blue",
          mate: {
            name: "Naamah",
            gender: "female",
            color: "pink"
          }
        },
        {
          name: "Lamech",
          gender: "male",
          color: "green"
        }
      ]
    },
    {
      nodes: [
        {
          name: "Noah",
          gender: "male",
          color: "blue",
          mate: {
            name: "Emzara",
            gender: "female",
            color: "pink"
          }
        },
        {
          name: "Shem",
          gender: "male",
          color: "green",
          mate: {
            name: "Sedeqetelebab",
            gender: "female",
            color: "yellow"
          }
        }
      ]
    }
  ];
  
  return (
    <div className="container mx-auto py-12">
      <Test data={lineageData} />
    </div>
  );
}