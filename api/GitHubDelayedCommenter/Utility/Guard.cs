using System;

namespace Utility
{
    public static class Guard
    {
        public static void IsNotNull<T>(T @object, string argumentName)
        {
            if (@object == null)
            {
                throw new ArgumentNullException(argumentName, "Argument cannot be null");
            }
        }

        public static void IsNotNullOrWhitespace(string @string, string argumentName)
        {
            if (@string == null)
            {
                throw new ArgumentNullException(argumentName, "Argument cannot be null");
            }

            if (@string.Trim() == string.Empty)
            {
                throw new ArgumentException("Argument cannot be whitespace or empty", argumentName);
            }
        }
    }
}
