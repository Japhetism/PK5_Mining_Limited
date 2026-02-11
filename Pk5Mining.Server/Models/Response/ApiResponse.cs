namespace Pk5Mining.Server.Models.Response
{
    public static class ApiResponse
    {
        public static ResponseModel SuccessMessage(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.SUCCESS,
                ResponseMessage = responseMessage,
                ResponseData = data
            };
        }
        public static ResponseModel PartialSuccessMessage(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.PARTIAL_SUCCESS,
                ResponseMessage = responseMessage,
                ResponseData = data
            };
        }
        public static ResponseModel Failure(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel UnknownException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel NotFoundException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel GenericException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel ConflictException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel AuthorizationException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }

        public static ResponseModel AuthenticationException(object? data, string? responseMessage)
        {
            return new ResponseModel
            {
                ResponseStatus = Status.FAIL,
                ResponseMessage = responseMessage,
                ResponseData = data,
            };
        }
    }
}
