// Assuming your function is defined in a file named 'imageController.js' in the 'controllers' directory
const { uploadImage } = require("../controllers/upload");

describe("uploadImage", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(), // To allow chaining
    };
    mockNext = jest.fn();
  });

  test("should respond with 400 if no file is provided", () => {
    mockReq.file = undefined; // Simulating no file uploaded

    uploadImage(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith("No image provided");
  });

  test("should respond with 200 and success message if file is uploaded", () => {
    mockReq.file = {
      /* mock file properties here, if necessary */
    }; // Simulate file being uploaded

    uploadImage(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith("Image received and processed.");
  });
});
