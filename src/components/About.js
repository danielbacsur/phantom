import team from "static/team"

const About = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {team.map(member => (
            <div className="text-center flex flex-col p-8">
                <img
                    src={member.image}
                    class="mx-auto h-32 w-32 rounded-full object-cover shadow-xl"
                />
                <span class="mt-8 text-lg font-bold font-lora">{member.name}</span>
                <p class="mt-2 text-xs font-medium text-gray-600">
                    {member.role}
                </p>
                <p class="mt-4 text-sm">
                    {member.description}
                </p>
            </div>
        ))}
    </div>
)

export default About