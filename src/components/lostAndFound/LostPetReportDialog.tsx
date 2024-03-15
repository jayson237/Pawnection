import { FormEvent, useState } from "react";

// Assuming Button and Textarea are your custom components
import { Button } from "../ui/Button";
import { Textarea } from "../ui/TextArea";
import {   Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription, } from "../ui/Dialog";

interface LostPetReportDialogProps {
    isOpen: boolean;
    onClose: () => void; // Assuming onClose does not take any arguments and doesn't return anything
  }

const LostPetReportDialog = ({ isOpen, onClose }: LostPetReportDialogProps) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenArea, setLastSeenArea] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [petImage, setPetImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
    const data = await sign.json()
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`
    try {
      const formData = new FormData()
      if (petImage) {
        formData.append("file", petImage)
        formData.append("api_key", data.apikey)
        formData.append("timestamp", data.timestamp.toString())
        formData.append("signature", data.signature)
        formData.append("eager", data.eager)
        formData.append("folder", data.folder)

        const cdnResponse = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
          cache: "no-store",
        })
        const resultImage = await cdnResponse.json()

        const response = await fetch("/api/lostAndFound/createLostPetReport", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            sex: sex,
            message: message,
            description: description,
            lastSeenArea: lastSeenArea,
            lastSeenDate: lastSeenDate,
            contactDetails: contactDetails,
            petImage: resultImage.secure_url,
          }),
        })

        if (!response.ok) {
          throw new Error(
            "Failed to create Missing Pet Report. Please try again.",
          )
        } else {
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => isOpen ? null : onClose()}>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent" style={{ overflowY: 'auto' }}>
          <DialogTitle className="DialogTitle">Report Missing Pet</DialogTitle>


        <form onSubmit={onSubmit}>
          
          <div >
          <div> Name</div>
          <Textarea
            name="petName"
            required={true}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          </div>

          <div >
          <div> Gender </div>
          <Textarea
            name="petSex"
            required={true}
            onChange={(e) => setSex(e.currentTarget.value)}
          />
          </div>

          <div >
          <div> Message From Owener </div>
          <Textarea
            name="reportMessage"
            required={true}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
          </div>

          <div >
          <div> Description </div>          
          <Textarea
            name="reportDescription"
            required={true}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div >
          <div> Area Last Seen </div>
          <Textarea
            name="lastSeenArea"
            required={true}
            onChange={(e) => setLastSeenArea(e.currentTarget.value)}
          />
          </div>

          <div >
          <div> Last Seen Date </div>
          <Textarea
            name="lastSeenDate"
            required={true}
            onChange={(e) => setLastSeenDate(e.currentTarget.value)}
          />
        </div>

        <div >
          <div> Contact Details </div>
          <Textarea
            name="contactDetails"
            required={true}
            onChange={(e) => setContactDetails(e.currentTarget.value)}
          />
          </div>

          <input
            // className="mr-8 ml-20 w-1/4"
            type="file"
            accept="image/*"
            required={true}
            onChange={(e) =>
              setPetImage(e.target.files ? e.target.files[0] : null)
            }
          />
        {/* </div> */}
          
          <div className="flex justify-center">
            <Button className="w-1/6 mt-10 justify-center" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>

        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LostPetReportDialog;
