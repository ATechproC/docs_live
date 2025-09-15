import { assets } from "@/constants";
import Header from "./Header";
import Image from "next/image";
import AddDocumentBtn from "./AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.action";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import CloseDeleteModal from "./CloseDeleteModal";
import Notifications from "./Notifications";

interface UserProps {
    userId: string;
    email: string;
}

const Home = async () => {

    const clerkUser = await currentUser();

    if (!clerkUser) return redirect("/sign-in");

    const user: UserProps = {
        userId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
    };

    const roomDocuments = await getDocuments(
        clerkUser.emailAddresses[0].emailAddress
    );

    return (
        <main>
            <Header>
                <div className="absolute right-11 top-[50%] -translate-y-[50%]">
                    <Notifications />
                </div>
            </Header>
            <section className="center-element text-center pt-5 pb-10">
                {roomDocuments?.data.length > 0 ? (
                    <>
                        <div className="center-element mt-2 flex-between">
                            <p>All documents</p>
                            <AddDocumentBtn user={user} />
                        </div>
                        <div className="center-element pt-5 flex flex-col gap-3">
                            {roomDocuments.data.map(
                                ({ id, metadata: { title }, createdAt }: any) => {
                                    return (
                                        <div key={id} className="relative">
                                            <Link href={`/documents/${id}`}>
                                                <div className="relative p-3 rounded-md bg-dark-1 flex-items gap-3">
                                                    <div className="bg-dark-2 px-1 py-2 rounded-sm">
                                                        <Image
                                                            src={assets.doc}
                                                            alt="doc"
                                                            width={30}
                                                            height={50}
                                                        />
                                                    </div>
                                                    <div className="text-start">
                                                        <p> {title} </p>
                                                        <p className="text-[11px] text-[#B4C6EE]">
                                                            {dateConverter(createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <CloseDeleteModal
                                                roomId={id}
                                                className="absolute right-4 top-2 cursor-pointer"
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </>
                ) : (
                    <div className="bg-dark-1 w-[40%] m-auto flex-items flex-col gap-5 p-5 rounded-md">
                        <Image src={assets.doc} alt="doc" width={45} height={65} />
                        <AddDocumentBtn user={user} />
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;
